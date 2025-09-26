// bot/index.mjs
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// В Node 18+ fetch есть глобально, отдельный пакет не нужен.

const SUPABASE_URL  = process.env.SUPABASE_URL;
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TG_TOKEN      = process.env.TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID    = process.env.TELEGRAM_CHAT_ID;     // число или @username
const TG_THREAD_ID  = process.env.TELEGRAM_THREAD_ID;   // опционально, для topics
// ENV
const ADMIN_IDS = process.env.ADMIN_IDS || '';

if (!SUPABASE_URL || !SERVICE_KEY || !TG_TOKEN || !ADMIN_IDS) {
  console.error('[bot] Missing env: SUPABASE_URL | SUPABASE_SERVICE_ROLE_KEY | TELEGRAM_BOT_TOKEN | ADMIN_IDS');
  process.exit(1);
}


const supa = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
  realtime: { params: { eventsPerSecond: 5 } },
});

// Простая защита от дублей при реконнектах
const seen = new Set();

function fmt(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x.toString() : String(n ?? '');
}

function parseAdminIds(s) {
  const isNumericId = (x) => /^-?\d+$/.test(x);  // только целое, допускаем -100...
  return s.split(',')
    .map(x => x.trim())
    .filter(Boolean)
    .map(x => {
      const [idPart, threadPart] = x.split(':');
      const chatId = isNumericId(idPart) ? Number(idPart) : idPart; // число или @username
      const threadId = threadPart && /^-?\d+$/.test(threadPart) ? Number(threadPart) : undefined;
      return { chatId, threadId };
    });
}
const RECIPIENTS = parseAdminIds(ADMIN_IDS);
if (!RECIPIENTS.length) {
  console.error('[bot] ADMIN_IDS parsed empty');
  process.exit(1);
}
console.log('[bot] recipients:', RECIPIENTS);

// отправка одному получателю с бэкоффом
async function sendOne(chatId, threadId, text) {
  const body = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
  if (Number.isFinite(threadId)) body.message_thread_id = threadId;

  let delay = 500;
  for (let i = 0; i < 5; i++) {
    const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status !== 429) {
      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`Telegram ${res.status}: ${t}`);
      }
      return;
    }
    await new Promise(r => setTimeout(r, delay));
    delay = Math.min(delay * 2, 8000);
  }
  throw new Error('Telegram rate-limited (429), retries exhausted');
}

// отправка всем админам (без падения из-за одного)
async function sendTelegram(text) {
  for (const r of RECIPIENTS) {
    try {
      await sendOne(r.chatId, r.threadId, text);
      console.log('[bot] sent to', r.chatId, r.threadId ?? '');
    } catch (e) {
      console.error('[bot] send fail to', r.chatId, r.threadId ?? '', e.message || e);
    }
  }
}


async function start() {
  console.log('[bot] starting…');

  const channel = supa
    .channel('stakes-inserts', { config: { broadcast: { ack: false } } })
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'stakes' },
      async (payload) => {
        try {
          const row = payload?.new || {};
          const id = row.id;
          if (!id || seen.has(id)) return;
          seen.add(id);

          const msg =
            `🟦 <b>Новый стейк</b>\n` +
            `Кошелек: <code>${row.wallet}</code>\n` +
            `Сумма: <b>${fmt(row.amount)} TON</b>\n` +
            `Срок: ${fmt(row.duration)} дн.\n` +
            `APR: ${fmt(row.apr)}%\n` +
            `Статус: ${row.status}\n` +
            (row.txHash ? `TxHash: <code>${row.txHash}</code>\n` : ``) +
            `ID: <code>${row.id}</code>`;

          await sendTelegram(msg);
          console.log('[bot] notified id=', row.id);
        } catch (e) {
          console.error('[bot] notify error:', e?.message || e);
        }
      }
    )
    .subscribe((status) => {
      console.log('[realtime] status:', status);
    });

  // Грейсфул-шатдаун
  const shutdown = async () => {
    console.log('\n[bot] shutting down…');
    try { await supa.removeChannel(channel); } catch {}
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

start().catch(err => {
  console.error('[bot] fatal:', err);
  process.exit(1);
});
