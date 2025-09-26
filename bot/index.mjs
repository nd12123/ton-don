// bot/index.mjs
 import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

 import { fileURLToPath } from 'url';
 import { dirname, join } from 'path';

// ── ВАЖНО: WebSocket-полифилл для Node → иначе Realtime = TIMED_OUT
import WS from 'ws';

import fs from 'fs';

globalThis.WebSocket = WS;
globalThis.self = globalThis; // на случай либ, ожидающих window/self

// Node 18+ имеет глобальный fetch — отдельные пакеты не нужны.

 const __dirname = dirname(fileURLToPath(import.meta.url));
 dotenv.config({ path: join(__dirname, '.env') }); // грузим bot/.env рядом со скриптом

// сразу после dotenv.config(...)
const envPath = join(__dirname, '.env');
console.log('[bot] dotenv path:', envPath);

console.log('[bot] dotenv path:', envPath, 'exists:', fs.existsSync(envPath));

const mask = (s) => (s ? s.slice(0,6) + '…' + s.slice(-4) : '(empty)');
console.log('[env]', {
  SUPABASE_URL: process.env.SUPABASE_URL || '(empty)',
  SUPABASE_SERVICE_ROLE_KEY: mask(process.env.SUPABASE_SERVICE_ROLE_KEY),
  BOT_TOKEN: mask(process.env.BOT_TOKEN),
  ADMIN_IDS: process.env.ADMIN_IDS || '(empty)',
  NODE_OPTIONS: process.env.NODE_OPTIONS || '(empty)',
});


const REQ = ['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','BOT_TOKEN','ADMIN_IDS'];
for (const k of REQ) {
  const v = process.env[k];
  if (!v || v.length === 0) {
    console.error('[bot] missing env:', k);
  }
}


// ── ENV
const SUPABASE_URL  = process.env.SUPABASE_URL;
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY; // можно ANON, если только слушаем
const TG_TOKEN      = process.env.BOT_TOKEN; // как у тебя в коде
const ADMIN_IDS     = process.env.ADMIN_IDS || '';

if (!SUPABASE_URL || !SERVICE_KEY || !TG_TOKEN || !ADMIN_IDS) {
  console.error('[bot] Missing env: SUPABASE_URL | SUPABASE_SERVICE_ROLE_KEY|SUPABASE_ANON_KEY | BOT_TOKEN | ADMIN_IDS');
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

// ADMIN_IDS формат: "123456:456,987654,-100777:12"
// где ":456" = optional topic/thread id; можно просто "123456"
function parseAdminIds(s) {
  const isInt = (x) => /^-?\d+$/.test(x);
  return s.split(',')
    .map(x => x.trim())
    .filter(Boolean)
    .map(x => {
      const [idPart, threadPart] = x.split(':');
      const chatId = isInt(idPart) ? Number(idPart) : idPart; // допускаем @username, но для личек нужен numeric id
      const threadId = threadPart && isInt(threadPart) ? Number(threadPart) : undefined;
      return { chatId, threadId };
    });
}
const RECIPIENTS = parseAdminIds(ADMIN_IDS);
if (!RECIPIENTS.length) {
  console.error('[bot] ADMIN_IDS parsed empty');
  process.exit(1);
}
console.log('[bot] recipients:', RECIPIENTS);

// ── Telegram
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

// ── Start
async function start() {
  console.log('[bot] starting…');

  const onInsert = async (payload) => {
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
  };

  const channel = supa
    .channel('public:stakes:alerts')
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'stakes' },
      onInsert
    )
    .subscribe(
      (status) => console.log('[realtime] status:', status),
      (err) => console.error('[realtime] error:', err?.message || err)
    );

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
