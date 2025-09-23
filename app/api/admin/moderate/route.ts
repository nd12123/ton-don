import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Берём сервисный клиент — он обходит RLS
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(url, serviceKey);

// Примитивная авторизация админки: секретный токен + whitelist кошельков
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN!;
const ADMIN_WALLETS = (process.env.ADMIN_WALLETS || '')
  .split(',')
  .map(s => s.trim().toLowerCase())
  .filter(Boolean);

type Body = {
  stakeId: number | string;
  action: 'approve' | 'reject' | 'hide';
  reason?: string;
  walletAddress: string; // кошелёк, с которого пришёл админ
};

export async function POST(req: Request) {
  try {
    // 1) Простой секрет в заголовке (храним в cookie на админ-UI или дергаем с бэка)
    const token = req.headers.get('x-admin-token');
    if (!token || token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    // 2) Валидируем тело
    const { stakeId, action, reason, walletAddress } = (await req.json()) as Body;
    if (!stakeId || !action || !walletAddress) {
      return NextResponse.json({ error: 'bad payload' }, { status: 400 });
    }

    // 3) Белый список кошельков (можно заменить на таблицу позже — API не поменяется)
    const isAdmin = ADMIN_WALLETS.includes(walletAddress.toLowerCase());
    if (!isAdmin) {
      return NextResponse.json({ error: 'not admin' }, { status: 403 });
    }

    // 4) Маппим действие -> статус в БД (подстрой под свою схему)
    const status =
      action === 'approve' ? 'approved' :
      action === 'reject'  ? 'rejected' :
      action === 'hide'    ? 'hidden'   : null;
    if (!status) {
      return NextResponse.json({ error: 'bad action' }, { status: 400 });
    }

    // 5) Обновляем запись (service role обходит RLS)
    const { error: e1 } = await supabase
      .from('stakes')
      .update({ status })
      .eq('id', Number(stakeId))
      .limit(1);
    if (e1) {
      return NextResponse.json({ error: e1.message }, { status: 500 });
    }

    // 6) (опционально) Журнал модерации — можно позже добавить таблицу internal.stake_moderation_log
    // await supabase.from('stake_moderation_log').insert({ stake_id: Number(stakeId), action, reason: reason ?? null, admin_address: walletAddress });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'internal' }, { status: 500 });
  }
}
