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
    const wallet = typeof body?.wallet === "string" ? body.wallet.trim() : "";

    if (!id) {
      return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
    }

    const sb = getSupabaseServer();

    // 1) читаем запись
    const { data: rows, error: e1 } = await sb
      .from("stakes")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (e1) return NextResponse.json({ ok: false, error: e1.message }, { status: 500 });

    const rec = rows?.[0];
    if (!rec) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    // 2) (опц) валидируем владельца
    if (wallet && wallet !== rec.wallet) {
      return NextResponse.json({ ok: false, error: "Wallet mismatch" }, { status: 403 });
    }

    // 3) идемпотентность: уже выведен
    if (rec.status === "withdrawn") {
      return NextResponse.json({ ok: true, record: rec });
    }

    // 4) разрешаем только из completed
    if (rec.status !== "completed") {
      return NextResponse.json(
        { ok: false, error: "Stake is not ready to withdraw (status must be 'completed')" },
        { status: 409 }
      );
    }

    // 5) апдейт статуса
    const { data, error } = await sb
      .from("stakes")
      .update({ status: "withdrawn" })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, record: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}
