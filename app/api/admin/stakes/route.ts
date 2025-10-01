// app/api/admin/stakes/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { Address } from "@ton/core";

const DEV = process.env.NODE_ENV !== "production";
const dbg = (...a: any[]) => DEV && console.log("[admin/stakes]", ...a);

function toRawAddr(x?: string | null): string | null {
  if (!x) return null;
  try {
    if (x.includes(":")) return x.toLowerCase();       // raw 0:...
    return Address.parseFriendly(x).address.toString().toLowerCase(); // EQ.. -> raw
  } catch {
    return x.toLowerCase();
  }
}

const ALLOWED_COLS = new Set([
  "validator",     // text, nullable
  "wallet",        // text, NOT NULL
  "amount",        // numeric, NOT NULL
  "duration",      // integer, NOT NULL
  "apr",           // numeric, NOT NULL
  "status",        // text, NOT NULL (default 'active')
  "txHash",        // text, nullable
  "created_at",    // timestamptz, NOT NULL (default now())
]);

type Op = "create" | "update" | "delete";

function sanitizePayload(input: any, ctx: { op: Op; walletFallback?: string | null }) {
  const src = (input || {}) as Record<string, any>;
  const data: Record<string, any> = {};

  // пропускаем только разрешённые ключи
  for (const [k, v] of Object.entries(src)) {
    if (!ALLOWED_COLS.has(k)) continue;
    // пустые строки превращаем в undefined, чтобы PATCH их не трогал
    if (typeof v === "string" && v.trim() === "") continue;
    data[k] = v;
  }

  // ─── типы ────────────────────────────────────────────────────────────────
  if (data.validator != null) data.validator = String(data.validator);
  if (data.wallet != null)    data.wallet    = String(data.wallet);
  if (data.amount != null)    data.amount    = Number(data.amount);
  if (data.apr != null)       data.apr       = Number(data.apr);
  if (data.duration != null)  data.duration  = Math.trunc(Number(data.duration));
  if (data.status != null)    data.status    = String(data.status);
  if (data.txHash != null)    data.txHash    = String(data.txHash);

  if (data.created_at != null) {
    const d = new Date(data.created_at);
    if (!Number.isNaN(d.getTime())) data.created_at = d.toISOString();
    else delete data.created_at;
  }

  // ─── правила create/update ───────────────────────────────────────────────
  if (ctx.op === "create") {
    // wallet: берём из payload, иначе из fallback, иначе ошибка
    if (!data.wallet && ctx.walletFallback) data.wallet = ctx.walletFallback;
    if (!data.wallet || typeof data.wallet !== "string") throw new Error("wallet required");

    // обязательные числовые поля
    if (!(Number.isFinite(Number(data.amount))   && Number(data.amount)   > 0)) throw new Error("amount>0 required");
    if (!(Number.isFinite(Number(data.apr))      && Number(data.apr)      >= 0)) throw new Error("apr>=0 required");
    if (!(Number.isFinite(Number(data.duration)) && Number(data.duration) >= 0)) throw new Error("duration>=0 required");

    // статус по умолчанию
    if (!data.status) data.status = "active";
  } else {
    // update: любой из полей может отсутствовать; если присутствует — валидируем.
    if (data.amount != null && !(Number.isFinite(Number(data.amount)) && Number(data.amount) > 0)) {
      throw new Error("amount must be > 0");
    }
    if (data.apr != null && !(Number.isFinite(Number(data.apr)) && Number(data.apr) >= 0)) {
      throw new Error("apr must be >= 0");
    }
    if (data.duration != null && !(Number.isFinite(Number(data.duration)) && Number(data.duration) >= 0)) {
      throw new Error("duration must be >= 0");
    }
    // если wallet пришёл пустым — просто не трогаем колонку
    if (data.wallet === undefined) {
      // ничего
    }
  }

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

export async function POST(req: NextRequest) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const serverToken = process.env.ADMIN_API_TOKEN || "";
  if (!url || !serviceKey) return NextResponse.json({ error: "server misconfigured: missing SUPABASE envs" }, { status: 500 });
  if (!serverToken) return NextResponse.json({ error: "server misconfigured: missing ADMIN_API_TOKEN" }, { status: 500 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }

  // авторизация по токену (cookie/header/body)
  const tokenCookie = req.cookies.get("admin_token")?.value || "";
  const tokenHeader = req.headers.get("x-admin-token") || "";
  const tokenBody   = typeof body?.adminToken === "string" ? body.adminToken : "";
  const provided    = tokenHeader || tokenCookie || tokenBody;
  const tokenOk     = provided === serverToken;
  if (!tokenOk) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const op = (String(body?.op || "") as Op) || "update";
  const id = String(body?.id || "");
  const walletFallback = toRawAddr(String(body?.walletAddress || "")) || undefined;

  try {
    if (op === "create") {
      const payload = sanitizePayload(body?.data, { op, walletFallback });
      const row = await restInsert(url, serviceKey, payload);
      return NextResponse.json({ ok: true, row });
    }
    if (op === "update") {
      if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
      const payload = sanitizePayload(body?.data, { op, walletFallback });
      const row = await restUpdate(url, serviceKey, id, payload);
      return NextResponse.json({ ok: true, row });
    }
    if (op === "delete") {
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
