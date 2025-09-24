import { Telegraf } from 'telegraf';
import { createClient } from '@supabase/supabase-js';
import pLimit from 'p-limit';
import WebSocket from 'ws';

globalThis.WebSocket = WebSocket;

const {
  BOT_TOKEN,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE,
  ADMIN_IDS,
  ADMIN_SECRET,
  APP_NAME = 'ton-stake',
  NETWORK = 'mainnet'
} = process.env;

if (!BOT_TOKEN) throw new Error('BOT_TOKEN is missing');
if (!SUPABASE_URL) throw new Error('SUPABASE_URL is missing');
if (!SUPABASE_SERVICE_ROLE) throw new Error('SUPABASE_SERVICE_ROLE is missing');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false }
});

const bot = new Telegraf(BOT_TOKEN);

bot.command('id', (ctx) => ctx.reply(String(ctx.chat.id)));

// Множество разрешенных админ-чатов из env
const envAdmins = new Set(
  (ADMIN_IDS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n))
);

/** Хелпер: является ли чат админским */
function isChatAdmin(chatId, dbRow) {
  if (envAdmins.has(chatId)) return true;
  // если чат помечен как админ в БД — тоже ок
  return !!dbRow?.is_admin;
}

/** Гарантируем запись чата в tg_subscribers */
async function upsertChat(chatId, { forceAdmin = false } = {}) {
  const { data, error } = await supabase
    .from('tg_subscribers')
    .upsert(
      {
        chat_id: chatId,
        // если есть в envAdmins или forceAdmin — пометим админом
        is_admin: envAdmins.has(chatId) || forceAdmin,
        // по умолчанию не подписываем, подпишется явно
        subscribed: false
      },
      { onConflict: 'chat_id' }
    )
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
}

/** Вкл/выкл подписку (только админы) */
async function setSubscription(chatId, subscribed) {
  const { data: row } = await supabase
    .from('tg_subscribers')
    .select('*')
    .eq('chat_id', chatId)
    .maybeSingle();

  if (!isChatAdmin(chatId, row)) return { ok: false, reason: 'not_admin' };

  const { error } = await supabase
    .from('tg_subscribers')
    .update({ subscribed })
    .eq('chat_id', chatId);

  if (error) throw error;
  return { ok: true };
}

/** Форматируем текст уведомления */
function formatEvent(ev) {
  const map = { stake: '💎 Stake', unstake: '♻️ Unstake', reward: '🎁 Reward', info: 'ℹ️ Info' };
  const title = map[ev.event_type] || '🔔 Event';
  const amount = ev.amount != null ? `\nСумма: ${Number(ev.amount).toLocaleString('en-US', { maximumFractionDigits: 9 })}` : '';
  const tx = ev.tx_hash ? `\nTX: ${ev.tx_hash}` : '';
  const extra = ev.payload ? `\nДетали: ${safeStringify(ev.payload)}` : '';
  return `${title} • ${APP_NAME.toUpperCase()} • ${NETWORK}\nДата: ${new Date(ev.created_at).toLocaleString()}` + amount + tx + extra;
}

function safeStringify(v) {
  try {
    if (typeof v === 'string') return v;
    return JSON.stringify(v, null, 2).slice(0, 2000);
  } catch {
    return String(v).slice(0, 2000);
  }
}

/** Шлём всем подписанным админ-чатам */
async function notifyAllAdmins(ev) {
  const { data: subs, error } = await supabase
    .from('tg_subscribers')
    .select('chat_id, is_admin, subscribed');

  if (error) {
    console.error('Failed to load subscribers', error);
    return;
  }

  const targets = subs?.filter((s) => s.is_admin && s.subscribed) || [];
  if (!targets.length) return;

  const msg = formatEvent(ev);
  const limit = pLimit(20);

  await Promise.all(
    targets.map(({ chat_id }) =>
      limit(async () => {
        try {
          await bot.telegram.sendMessage(chat_id, msg, { disable_web_page_preview: true });
        } catch (e) {
          console.warn('send fail', chat_id, e?.description || e?.message);
        }
      })
    )
  );
}

/** Подписка на realtime вставки в staking_events */
async function subscribeRealtime() {
  const ch = supabase
    .channel('staking_events_ins')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'staking_events' },
      async (payload) => {
        const ev = payload.new;
        // минимальная валидация
        if (!ev?.event_type) return;
        await notifyAllAdmins(ev);
      }
    )
    .subscribe((status) => console.log('Realtime status:', status));
  return ch;
}

/** Команды */
bot.start(async (ctx) => {
  const chatId = ctx.chat.id;
  // если чат в envAdmins – сразу добавим как админа
  const row = await upsertChat(chatId, { forceAdmin: envAdmins.has(chatId) });

  if (isChatAdmin(chatId, row)) {
    await ctx.reply(
      'Привет, админ 👑\n' +
      'Команды: /sub — включить уведомления, /unsub — выключить, /status — состояние, /ping — пульс.\n' +
      'События берём из public.staking_events (INSERT).'
    );
  } else {
    await ctx.reply('Этот бот только для админов.');
  }
});

bot.command('ping', async (ctx) => ctx.reply('pong'));

bot.command('sub', async (ctx) => {
  const res = await setSubscription(ctx.chat.id, true);
  if (!res.ok && res.reason === 'not_admin') return ctx.reply('Нет доступа.');
  return ctx.reply('Уведомления включены ✅');
});

bot.command('unsub', async (ctx) => {
  const res = await setSubscription(ctx.chat.id, false);
  if (!res.ok && res.reason === 'not_admin') return ctx.reply('Нет доступа.');
  return ctx.reply('Уведомления выключены ❌');
});

bot.command('status', async (ctx) => {
  const chatId = ctx.chat.id;
  const { data } = await supabase
    .from('tg_subscribers')
    .select('is_admin, subscribed')
    .eq('chat_id', chatId)
    .maybeSingle();

  const isAdmin = isChatAdmin(chatId, data);
  const sub = data?.subscribed ? 'включены ✅' : 'выключены ❌';
  await ctx.reply(`Админ: ${isAdmin ? 'да' : 'нет'}\nУведомления: ${sub}`);
});

// Опционально: авторизация по секрету, чтобы добавить нового админа без редеплоя
// включится только если ADMIN_SECRET задан в .env
if (process.env.ADMIN_SECRET) {
  bot.command('auth', async (ctx) => {
    const chatId = ctx.chat.id;
    const parts = ctx.message.text.trim().split(/\s+/);
    const secret = parts[1];

    if (!secret) return ctx.reply('Формат: /auth <секрет>');
    if (secret !== process.env.ADMIN_SECRET) return ctx.reply('Неверный секрет.');

    // добавляем чат если его нет и поднимаем права
    await supabase
      .from('tg_subscribers')
      .upsert({ chat_id: chatId, is_admin: true, subscribed: false }, { onConflict: 'chat_id' });

    await ctx.reply('Права админа выданы. Включи /sub, чтобы получать уведомления.');
  });
}

/** Запуск */
(async function main() {
  await subscribeRealtime();
  await bot.launch();
  console.log('Admin TG bot up');
})();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
