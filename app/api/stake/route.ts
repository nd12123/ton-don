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
    const cleaned = cand.trim().replace(/^0x/, "");
    // Validate it's a valid hex string (base64 or hex)
    if (!/^[a-fA-F0-9]{64}$/.test(cleaned) && !/^[A-Za-z0-9+/=]{40,}$/.test(cleaned)) {
      throw new Error("txHash must be valid hex (64 chars) or base64 format");
    }
    return cleaned;
  }
  throw new Error("txHash required (must be a non-empty string)");
}

// Validate wallet address format
function validateWallet(wallet: string): boolean {
  const trimmed = wallet.trim();
  // TON addresses can be in different formats:
  // - Raw: "0:..." (workchain:hash)
  // - Friendly: base64 encoded (48 chars typically)
  // Basic validation - should start with 0: or - or be base64-like
  if (trimmed.startsWith("0:") || trimmed.startsWith("-1:")) {
    // Raw format: workchain:hash (hash should be 64 hex chars)
    const parts = trimmed.split(":");
    return parts.length === 2 && /^[a-fA-F0-9]{64}$/.test(parts[1]);
  }
  // Friendly format (base64, typically 48 chars)
  if (/^[A-Za-z0-9_-]{48}$/.test(trimmed)) {
    return true;
  }
  return false;
}

// Validate APR is one of the allowed tiers
function validateAPR(apr: number): boolean {
  const allowedAPRs = [4, 7, 10]; // Based on your plan tiers
  return allowedAPRs.includes(apr);
}

// Validate duration bounds
function validateDuration(duration: number): boolean {
  // Reasonable bounds: between 1 day and 365 days
  return duration >= 1 && duration <= 365;
}

// Validate amount bounds
function validateAmount(amount: number): boolean {
  const MIN_AMOUNT = 10;
  const MAX_AMOUNT = 100000; // Set reasonable max
  return amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
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

    // Validate amount
    if (!Number.isFinite(amount) || !validateAmount(amount)) {
      return NextResponse.json(
        { ok: false, error: "amount must be between 10 and 100000 TON" },
        { status: 400 }
      );
    }

    // Validate APR
    if (!Number.isFinite(apr) || !validateAPR(apr)) {
      return NextResponse.json(
        { ok: false, error: "apr must be one of: 4, 7, 10" },
        { status: 400 }
      );
    }

    // Validate duration
    if (!Number.isInteger(duration) || !validateDuration(duration)) {
      return NextResponse.json(
        { ok: false, error: "duration must be between 1 and 365 days" },
        { status: 400 }
      );
    }

    // Validate validator if provided
    if (validator != null && typeof validator !== "string") {
      return NextResponse.json({ ok: false, error: "validator must be string" }, { status: 400 });
    }

    // Validate wallet
    const wallet = String(walletRaw).trim();
    if (!wallet) {
      return NextResponse.json({ ok: false, error: "wallet required" }, { status: 400 });
    }
    if (!validateWallet(wallet)) {
      return NextResponse.json(
        { ok: false, error: "wallet address format invalid" },
        { status: 400 }
      );
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
