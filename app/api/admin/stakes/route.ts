// app/api/admin/stakes/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { Address } from "@ton/core";

// ─── utils ───────────────────────────────────────────────────────────────────
const DEV = process.env.NODE_ENV !== "production";
const dbg = (...a: any[]) => DEV && console.log("[admin/stakes]", ...a);

function toRawAddr(x?: string | null): string | null {
  if (!x) return null;
  try {
    if (x.includes(":")) return x.toLowerCase();
    return Address.parseFriendly(x).address.toString().toLowerCase();
  } catch {
    return x.toLowerCase();
  }
}
function buildAdminSet() {
  const csv =
    process.env.ADMIN_WALLETS ||
    process.env.NEXT_PUBLIC_ADMIN_WALLETS ||
    "";
  const raws = csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => toRawAddr(s))
    .filter((s): s is string => Boolean(s));
  return new Set(raws);
}
function getAdminToken(): string {
  return (
    process.env.ADMIN_API_TOKEN ||
    process.env.ADMIN_UI_TOKEN ||
    process.env.NEXT_PUBLIC_ADMIN_UI_TOKEN ||
    ""
  );
}

const ALLOWED_COLS = new Set([
  "validator",
  "owner",
  "wallet",
  "amount",
  "duration",
  "apr",
  "status",     // active | completed | withdrawn
  "txHash",
  "created_at", // можно редактировать
]);

function sanitizePayload(input: any, walletFallback: string) {
  const src = (input || {}) as Record<string, any>;
  const data: Record<string, any> = {};
  for (const [k, v] of Object.entries(src)) {
    if (!ALLOWED_COLS.has(k)) continue;
    data[k] = v;
  }

  if (!data.wallet) data.wallet = walletFallback;

  if (data.validator != null) data.validator = String(data.validator);
  if (data.owner !== undefined) data.owner = data.owner ? String(data.owner) : null;
  if (data.wallet != null) data.wallet = String(data.wallet);
  if (data.amount != null) data.amount = Number(data.amount);
  if (data.apr != null) data.apr = Number(data.apr);
  if (data.duration != null) data.duration = Math.trunc(Number(data.duration));
  if (data.status != null) data.status = String(data.status);
  if (data.txHash !== undefined) data.txHash = data.txHash ? String(data.txHash) : null;

  if (data.created_at) {
    const d = new Date(data.created_at);
    if (!Number.isNaN(d.getTime())) data.created_at = d.toISOString();
    else delete data.created_at;
  }

  // минимальные проверки
  if (!data.validator || typeof data.validator !== "string") throw new Error("validator required");
  if (!data.wallet || typeof data.wallet !== "string") throw new Error("wallet required");
  if (!(Number.isFinite(Number(data.amount)) && Number(data.amount) > 0)) throw new Error("amount>0 required");
  if (!(Number.isFinite(Number(data.apr)) && Number(data.apr) >= 0)) throw new Error("apr>=0 required");
  if (!(Number.isFinite(Number(data.duration)) && Number(data.duration) >= 0)) throw new Error("duration>=0 required");
  if (!data.status) data.status = "active";

  return data;
}

async function restInsert(url: string, serviceKey: string, payload: any) {
  const res = await fetch(`${url}/rest/v1/stakes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`[REST insert ${res.status}] ${text}`);
  return text ? JSON.parse(text) : null;
}
async function restUpdate(url: string, serviceKey: string, id: string, payload: any) {
  const res = await fetch(`${url}/rest/v1/stakes?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`[REST update ${res.status}] ${text}`);
  return text ? JSON.parse(text) : null;
}
async function restDelete(url: string, serviceKey: string, id: string) {
  const res = await fetch(`${url}/rest/v1/stakes?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "return=minimal",
    },
  });
  if (!res.ok) throw new Error(`[REST delete ${res.status}] ${await res.text()}`);
}

// ─── handler ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !serviceKey) {
    return NextResponse.json({ error: "server misconfigured: missing SUPABASE_URL or SERVICE_ROLE" }, { status: 500 });
  }

  const adminSet = buildAdminSet();
  const tokenEnv = getAdminToken();

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }

  const headerToken = req.headers.get("x-admin-token") || "";
  const bodyToken = typeof body?.adminToken === "string" ? body.adminToken : "";
  const rawFromClient = toRawAddr(String(body?.walletAddress || "")) || "";
  const isAdminWallet = rawFromClient && adminSet.has(rawFromClient);
  const tokenOk = !!tokenEnv && (headerToken === tokenEnv || bodyToken === tokenEnv);

  dbg("wallet:", rawFromClient, "isAdmin:", isAdminWallet, "tokenOk:", tokenOk);

  // ⬇ dev: достаточно кошелька ИЛИ токена; prod: требуется и то, и другое
  if (DEV) {
    if (!isAdminWallet && !tokenOk) {
      return NextResponse.json({ error: "forbidden (dev: need admin wallet OR token)" }, { status: 403 });
    }
  } else {
    if (!isAdminWallet || !tokenOk) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  }

  const op = String(body?.op || "");
  try {
    if (op === "create") {
      const payload = sanitizePayload(body?.data, rawFromClient);
      const row = await restInsert(url, serviceKey, payload);
      return NextResponse.json({ ok: true, row });
    }
    if (op === "update") {
      const id = String(body?.id || "");
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
      const payload = sanitizePayload(body?.data, rawFromClient);
      const row = await restUpdate(url, serviceKey, id, payload);
      return NextResponse.json({ ok: true, row });
    }
    if (op === "delete") {
      const id = String(body?.id || "");
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
      await restDelete(url, serviceKey, id);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "unknown op" }, { status: 400 });
  } catch (e: any) {
    console.error("[admin/stakes] fatal:", e?.message || e);
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 });
  }
}
