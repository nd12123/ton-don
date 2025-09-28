// app/api/stakes/[id]/withdraw/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json().catch(() => ({}));
    const amount = Number(body?.amount);
    const wallet = typeof body?.wallet === "string" ? body.wallet : "";

    if (!id || !Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const sb = getSupabaseServer();

    // 1) читаем запись
    const { data: rows, error: e1 } = await sb
      .from("stakes")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

    const rec = rows?.[0];
    if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // 2) (опц) валидация владельца
    if (wallet && wallet !== rec.wallet) {
      return NextResponse.json({ error: "Wallet mismatch" }, { status: 403 });
    }

    // 3) считаем остаток
    const w = Math.min(Math.max(amount, 0), Number(rec.amount));
    const newAmount = Number(rec.amount) - w;

    // 4) апдейт: если полный — ставим 0 и completed, иначе уменьшаем
    if (newAmount <= 0) {
      const { data, error } = await sb
        .from("stakes")
        .update({
          amount: 0,
          status: "completed",
          // completed_at: new Date().toISOString(), // если есть такая колонка
        })
        .eq("id", id)
        .select("*")
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, record: data, completed: true });
    } else {
      const { data, error } = await sb
        .from("stakes")
        .update({ amount: newAmount, status: "active" })
        .eq("id", id)
        .select("*")
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, record: data, completed: false });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
