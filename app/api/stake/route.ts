// app/api/stake/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Создаем server-side клиент с service_role (RLS обходится корректно)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supa = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

function toNumber(x: unknown): number {
  const n = Number(x);
  return Number.isFinite(n) ? n : NaN;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Поддержим и walletAddress на всякий, но в базу пишем в колонку wallet
    const walletRaw: unknown = body?.wallet ?? body?.walletAddress;
    const validator: unknown = body?.validator ?? null;
    const amountRaw: unknown = body?.amount;
    const aprRaw: unknown = body?.apr;
    const durationRaw: unknown = body?.duration;
    const txHashRaw: unknown = body?.txHash ?? null; // В БД колонка именно txHash (camelCase)

    // Базовая валидация обязательных полей
    if (!walletRaw || amountRaw == null || aprRaw == null || durationRaw == null) {
      return NextResponse.json(
        { ok: false, error: "wallet, amount, apr, duration required" },
        { status: 400 }
      );
    }

    // Приводим численные поля к корректным типам
    const amount = toNumber(amountRaw);
    const apr = toNumber(aprRaw);
    const duration = Math.trunc(toNumber(durationRaw)); // всегда number

    if (!(Number.isFinite(amount) && amount > 0)) {
      return NextResponse.json({ ok: false, error: "amount>0 required" }, { status: 400 });
    }
    if (!(Number.isFinite(apr) && apr >= 0)) {
      return NextResponse.json({ ok: false, error: "apr>=0 required" }, { status: 400 });
    }
    if (!(Number.isInteger(duration) && duration >= 0)) {
      return NextResponse.json({ ok: false, error: "duration>=0 integer required" }, { status: 400 });
    }

    // Validator — опционален, но если пришел, требуем строку
    if (validator != null && typeof validator !== "string") {
      return NextResponse.json({ ok: false, error: "validator must be string" }, { status: 400 });
    }

    // txHash — опционален, но если пришел, требуем строку (и оставляем camelCase)
    if (txHashRaw != null && typeof txHashRaw !== "string") {
      return NextResponse.json({ ok: false, error: "txHash must be string" }, { status: 400 });
    }

    const wallet = String(walletRaw).trim();
    if (!wallet) {
      return NextResponse.json({ ok: false, error: "wallet required" }, { status: 400 });
    }

    // Формируем ровно тот payload, что ожидает схема public.stakes
    const payload = {
      wallet,                // text NOT NULL
      validator: validator as string | null, // text NULL
      amount,                // numeric NOT NULL
      apr,                   // numeric NOT NULL
      duration,              // integer NOT NULL
      status: "active",      // text DEFAULT 'active'
      txHash: (txHashRaw as string | null) ?? null, // text (camelCase в БД)
    };

    const { data, error } = await supa
      .from("stakes")
      .insert([payload])
      .select("*")
      .single();

    if (error) {
      // Прокинем подробности ошибки из Supabase (удобно для дебага)
      return NextResponse.json(
        { ok: false, error: error.message, details: (error as any)?.details ?? null, hint: (error as any)?.hint ?? null },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, record: data });
  } catch (e: any) {
    console.error("POST /api/stake error:", e);
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
