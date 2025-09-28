// app/api/stakes/[id]/withdraw/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

// (опционально, чтобы выключить кеш/SSG)
export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  // ВАЖНО: params — это Promise<{ id: string }>
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

    // 1) достаём запись
    const { data: rows, error: e1 } = await sb
      .from("stakes")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

    const rec = rows?.[0];
    if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // 2) простая валидация владельца (опционально)
    if (wallet && wallet !== rec.wallet) {
      return NextResponse.json({ error: "Wallet mismatch" }, { status: 403 });
    }

    // 3) считаем новый остаток
    const w = Math.min(Math.max(amount, 0), Number(rec.amount));
    const newAmount = Number(rec.amount) - w;

    if (newAmount <= 0) {
      // полный вывод — удаляем строку
      const { error: eDel } = await sb.from("stakes").delete().eq("id", id);
      if (eDel) return NextResponse.json({ error: eDel.message }, { status: 500 });

      return NextResponse.json({ ok: true, deleted: true, id });
    } else {
      // частичный — обновляем amount
      const { data, error: eUpd } = await sb
        .from("stakes")
        .update({ amount: newAmount, status: "active" })
        .eq("id", id)
        .select("*")
        .single();

      if (eUpd) return NextResponse.json({ error: eUpd.message }, { status: 500 });

      return NextResponse.json({ ok: true, record: data });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
