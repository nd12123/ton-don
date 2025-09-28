// app/api/stake/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

let _supa: SupabaseClient | null = null;

function getSupa(): SupabaseClient {
  if (_supa) return _supa;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !serviceKey) {
    throw new Error("Supabase env missing: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY");
  }
  _supa = createClient(url, serviceKey, { auth: { persistSession: false } });
  return _supa;
}

function toNumber(x: unknown): number {
  const s = typeof x === "string" ? x.replace(",", ".") : x;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

// читаем хэш под разными именами, но требуем непустую строку
function requireTxHash(body: any): string {
  const cand =
    body?.txHash ?? body?.txhash ?? body?.tx_hash ??
    body?.transactionHash ?? body?.messageHash ?? body?.hash ?? null;
  if (typeof cand === "string" && cand.trim().length >= 8) {
    return cand.trim().replace(/^0x/, "");
  }
  throw new Error("txHash required (must be a non-empty string)");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const walletRaw: unknown   = body?.wallet ?? body?.walletAddress;
    const validator: unknown   = body?.validator ?? null;
    const amountRaw: unknown   = body?.amount;
    const aprRaw: unknown      = body?.apr;
    const durationRaw: unknown = body?.duration;

    // ОБЯЗАТЕЛЬНО ждём и требуем хэш
    const txHash = requireTxHash(body);

    if (!walletRaw || amountRaw == null || aprRaw == null || durationRaw == null) {
      return NextResponse.json(
        { ok: false, error: "wallet, amount, apr, duration required" },
        { status: 400 }
      );
    }

    const amount   = toNumber(amountRaw);
    const apr      = toNumber(aprRaw);
    const duration = Math.trunc(toNumber(durationRaw));

    if (!(Number.isFinite(amount) && amount > 0)) {
      return NextResponse.json({ ok: false, error: "amount>0 required" }, { status: 400 });
    }
    if (!(Number.isFinite(apr) && apr >= 0)) {
      return NextResponse.json({ ok: false, error: "apr>=0 required" }, { status: 400 });
    }
    if (!(Number.isInteger(duration) && duration >= 0)) {
      return NextResponse.json({ ok: false, error: "duration>=0 integer required" }, { status: 400 });
    }
    if (validator != null && typeof validator !== "string") {
      return NextResponse.json({ ok: false, error: "validator must be string" }, { status: 400 });
    }

    const wallet = String(walletRaw).trim();
    if (!wallet) {
      return NextResponse.json({ ok: false, error: "wallet required" }, { status: 400 });
    }

    const supa = getSupa();

    // Идемпотентность по txHash: если уже писали — просто вернём
    const { data: existing } = await supa
      .from("stakes")
      .select("*")
      .eq("txHash", txHash)
      .limit(1)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ ok: true, record: existing });
    }

    const payload = {
      wallet,
      validator: (validator as string) ?? null,
      amount,
      apr,
      duration,
      status: "active",  // сразу активный (по вашей модели)
      txHash,
    } as const;

    const { data, error } = await supa
      .from("stakes")
      .insert([payload])
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, details: (error as any)?.details ?? null, hint: (error as any)?.hint ?? null },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, record: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 400 });
  }
}
