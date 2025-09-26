// app/api/stake/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// НИЧЕГО не делаем на верхнем уровне: ни чтения env, ни createClient.
// Ленивая инициализация клиента — только в рантайме запроса.
let _supa: SupabaseClient | null = null;

function getSupa(): SupabaseClient {
  if (_supa) return _supa;

  // Разрешаем URL из двух вариантов переменных (на сервере лучше без NEXT_PUBLIC)
  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!url || !serviceKey) {
    // Бросаем только в момент РАНТАЙМА (когда реально пришёл запрос),
    // а не на этапе импорта/сборки.
    throw new Error("Supabase env missing: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY");
  }

  _supa = createClient(url, serviceKey, { auth: { persistSession: false } });
  return _supa;
}

function toNumber(x: unknown): number {
  const n = Number(x);
  return Number.isFinite(n) ? n : NaN;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Поддержим оба поля кошелька
    const walletRaw: unknown = body?.wallet ?? body?.walletAddress;
    const validator: unknown = body?.validator ?? null;
    const amountRaw: unknown = body?.amount;
    const aprRaw: unknown = body?.apr;
    const durationRaw: unknown = body?.duration;
    const txHashRaw: unknown = body?.txHash ?? null;

    // Базовая валидация
    if (!walletRaw || amountRaw == null || aprRaw == null || durationRaw == null) {
      return NextResponse.json(
        { ok: false, error: "wallet, amount, apr, duration required" },
        { status: 400 }
      );
    }

    const amount = toNumber(amountRaw);
    const apr = toNumber(aprRaw);
    const duration = Math.trunc(toNumber(durationRaw));

    if (!(Number.isFinite(amount) && amount > 0)) {
      return NextResponse.json({ ok: false, error: "amount>0 required" }, { status: 400 });
    }
    if (!(Number.isFinite(apr) && apr >= 0)) {
      return NextResponse.json({ ok: false, error: "apr>=0 required" }, { status: 400 });
    }
    if (!(Number.isInteger(duration) && duration >= 0)) {
      return NextResponse.json(
        { ok: false, error: "duration>=0 integer required" },
        { status: 400 }
      );
    }
    if (validator != null && typeof validator !== "string") {
      return NextResponse.json({ ok: false, error: "validator must be string" }, { status: 400 });
    }
    if (txHashRaw != null && typeof txHashRaw !== "string") {
      return NextResponse.json({ ok: false, error: "txHash must be string" }, { status: 400 });
    }

    const wallet = String(walletRaw).trim();
    if (!wallet) {
      return NextResponse.json({ ok: false, error: "wallet required" }, { status: 400 });
    }

    const payload = {
      wallet,                                   // text NOT NULL
      validator: (validator as string) ?? null, // text NULL
      amount,                                   // numeric NOT NULL
      apr,                                      // numeric NOT NULL
      duration,                                 // integer NOT NULL
      status: "active",                         // text DEFAULT 'active'
      txHash: (txHashRaw as string | null) ?? null, // text (camelCase в БД)
    };

    const supa = getSupa(); // ← создаём клиента здесь, в рантайме
    const { data, error } = await supa
      .from("stakes")
      .insert([payload])
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
          details: (error as any)?.details ?? null,
          hint: (error as any)?.hint ?? null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, record: data });
  } catch (e: any) {
    // Если упадём из-за отсутствующих env — это тоже попадёт сюда.
    console.error("POST /api/stake error:", e);
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
