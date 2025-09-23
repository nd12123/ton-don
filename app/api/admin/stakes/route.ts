// app/api/admin/stakes/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || '';
const ADMIN_WALLETS = (process.env.ADMIN_WALLETS || '')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

const ALLOWED_FIELDS = new Set([
  'validator','owner','wallet','amount','apr','duration','status','txHash'
]);
const pick = (o:any) => Object.fromEntries(Object.entries(o||{}).filter(([k]) => ALLOWED_FIELDS.has(k)));

type Body =
  | { op:'create'; walletAddress:string; data:any }
  | { op:'update'; walletAddress:string; id:number; data:any }
  | { op:'delete'; walletAddress:string; id:number };

export async function POST(req: Request) {
  // ЛЕНИВАЯ инициализация ТУТ, а не на верхнем уровне:
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    return NextResponse.json({ error: 'server env missing' }, { status: 500 });
  }
  const supabase = createClient(url, key);

  const token = req.headers.get('x-admin-token') || '';
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN)
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const body = (await req.json()) as Body;
  if (!('walletAddress' in body) || !body.walletAddress)
    return NextResponse.json({ error: 'wallet required' }, { status: 400 });
  if (!ADMIN_WALLETS.includes(body.walletAddress.toLowerCase()))
    return NextResponse.json({ error: 'not admin' }, { status: 403 });

  if (body.op === 'create') {
    const { error } = await supabase.from('stakes').insert([pick(body.data)]);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (body.op === 'update') {
    if (!body.id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('stakes').update(pick(body.data)).eq('id', body.id).limit(1);
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
}
