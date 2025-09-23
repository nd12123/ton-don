// Один POST-роут для всех админ-операций: create / update / delete
// Авторизация: заголовок x-admin-token + кошелёк в белом списке.
// Пишем через service role => RLS обходим безопасно.

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(url, serviceKey);

// Секрет для админки и whitelist кошельков (заведи в .env на сервере)
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || '';
const ADMIN_WALLETS = (process.env.ADMIN_WALLETS || '')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

// Разрешённые поля для записи в stakes (защита от лишних ключей)
const ALLOWED_FIELDS = new Set([
  'validator', 'owner', 'wallet', 'amount', 'apr', 'duration', 'status', 'txHash'
]);

function sanitize(input: any) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(input || {})) {
    if (ALLOWED_FIELDS.has(k)) out[k] = v;
  }
  return out;
}

type Body =
  | { op: 'create'; walletAddress: string; data: any }
  | { op: 'update'; walletAddress: string; id: number; data: any }
  | { op: 'delete'; walletAddress: string; id: number };

export async function POST(req: Request) {
  try {
    // 1) Проверяем секрет
    const token = req.headers.get('x-admin-token') || '';
    if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    // 2) Валидируем payload
    const body = (await req.json()) as Body;
    if (!('walletAddress' in body) || !body.walletAddress) {
      return NextResponse.json({ error: 'wallet required' }, { status: 400 });
    }

    // 3) Проверяем кошелёк в whitelist
    const isAdmin = ADMIN_WALLETS.includes(body.walletAddress.toLowerCase());
    if (!isAdmin) return NextResponse.json({ error: 'not admin' }, { status: 403 });

    // 4) Операции
    if (body.op === 'create') {
      const payload = sanitize(body.data);
      const { error } = await supabase.from('stakes').insert([payload]);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }

    if (body.op === 'update') {
      if (!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 });
      const payload = sanitize(body.data);
      const { error } = await supabase.from('stakes').update(payload).eq('id', body.id).limit(1);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }

    if (body.op === 'delete') {
      if (!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 });
      const { error } = await supabase.from('stakes').delete().eq('id', body.id).limit(1);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'bad op' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'internal' }, { status: 500 });
  }
}
