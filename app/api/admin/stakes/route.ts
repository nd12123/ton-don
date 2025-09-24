// app/api/admin/stakes/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

const DEV = process.env.NODE_ENV !== "production";
const dbg = (...a: any[]) => DEV && console.log("[admin/stakes]", ...a);

const normTon = (s: string) => s?.toLowerCase().replace(/[^a-z0-9:_-]/g, "") ?? "";
const isUUID = (s: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);

// Разрешённые в твоей таблице поля
const ALLOWED_COLS = new Set([
  "validator", "wallet", "amount", "duration", "apr", "status", "txHash"
]);

function sanitizePayload(input: any, walletFallback: string) {
  const src = (input || {}) as Record<string, any>;
  const data: Record<string, any> = {};
  for (const [k, v] of Object.entries(src)) {
    if (!ALLOWED_COLS.has(k)) continue;
    data[k] = v;
  }
  if (!data.wallet) data.wallet = walletFallback;
  // минимальная валидация типов/обязательных полей
  if (!data.validator || typeof data.validator !== 'string') throw new Error('validator required');
  if (!data.wallet || typeof data.wallet !== 'string') throw new Error('wallet required');
  if (!(Number.isFinite(Number(data.amount)) && Number(data.amount) > 0)) throw new Error('amount>0 required');
  if (!(Number.isFinite(Number(data.apr)) && Number(data.apr) >= 0)) throw new Error('apr>=0 required');
  if (!(Number.isFinite(Number(data.duration)) && Number(data.duration) >= 0)) throw new Error('duration>=0 required');
  if (!data.status) data.status = 'active';
  return data;
}

async function restInsert(url: string, serviceKey: string, payload: any) {
  const res = await fetch(`${url}/rest/v1/stakes`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  if (!res.ok) {
    // пробуем распарсить json ошибки ради деталей
    let err: any = text;
    try { err = JSON.parse(text); } catch {}
    throw new Error(`[REST insert ${res.status}] ${typeof err === 'string' ? err : JSON.stringify(err)}`);
  }
  return text ? JSON.parse(text) : null;
}

async function restUpdate(url: string, serviceKey: string, id: string, payload: any) {
  const res = await fetch(`${url}/rest/v1/stakes?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  if (!res.ok) {
    let err: any = text;
    try { err = JSON.parse(text); } catch {}
    throw new Error(`[REST update ${res.status}] ${typeof err === 'string' ? err : JSON.stringify(err)}`);
  }
  return text ? JSON.parse(text) : null;
}

async function restDelete(url: string, serviceKey: string, id: string) {
  const res = await fetch(`${url}/rest/v1/stakes?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Prefer': 'return=minimal'
    }
  });
  if (!res.ok) {
    const text = await res.text();
    let err: any = text;
    try { err = JSON.parse(text); } catch {}
    throw new Error(`[REST delete ${res.status}] ${typeof err === 'string' ? err : JSON.stringify(err)}`);
  }
}

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  dbg("NODE_ENV=", process.env.NODE_ENV);
  dbg("SUPABASE_URL?", Boolean(url), "SERVICE_ROLE_KEY len=", serviceKey.length);

  if (!url || !serviceKey) {
    return NextResponse.json({ error: "server misconfigured: missing SUPABASE_URL or SERVICE_ROLE" }, { status: 500 });
  }

  const adminWallets = (process.env.ADMIN_WALLETS || "")
    .split(",").map(normTon).filter(Boolean);
  dbg("ADMIN_WALLETS=", adminWallets);

  const tokenHeader = req.headers.get("x-admin-token") || "";
  const tokenEnv = process.env.ADMIN_API_TOKEN || "";
  dbg("got token?", Boolean(tokenHeader), "ADMIN_TOKEN set?", Boolean(tokenEnv));

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }

  const rawAddr = normTon(body?.walletAddress);
  const isAdminWallet = rawAddr && adminWallets.includes(rawAddr);
  const tokenOk = tokenEnv && tokenHeader === tokenEnv;

  if (DEV) {
    if (!isAdminWallet) return NextResponse.json({ error: "forbidden (wallet)" }, { status: 403 });
    dbg("[DEV] admin wallet ok:", rawAddr);
  } else {
    if (!isAdminWallet || !tokenOk) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const op = body?.op;
  try {
    if (op === "create") {
      const payload = sanitizePayload(body?.data, rawAddr);
      dbg("CREATE payload=", payload);
      const row = await restInsert(url, serviceKey, payload);
      return NextResponse.json({ ok: true, row });
    }
    if (op === "update") {
      const id = String(body?.id || "");
      if (!isUUID(id)) return NextResponse.json({ error: "bad id" }, { status: 400 });
      const payload = sanitizePayload(body?.data, rawAddr);
      dbg("UPDATE id=", id, "payload=", payload);
      const row = await restUpdate(url, serviceKey, id, payload);
      return NextResponse.json({ ok: true, row });
    }
    if (op === "delete") {
      const id = String(body?.id || "");
      if (!isUUID(id)) return NextResponse.json({ error: "bad id" }, { status: 400 });
      dbg("DELETE id=", id);
      await restDelete(url, serviceKey, id);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "unknown op" }, { status: 400 });
  } catch (e: any) {
    console.error("[admin/stakes] fatal:", e?.message || e);
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 });
  }
}
