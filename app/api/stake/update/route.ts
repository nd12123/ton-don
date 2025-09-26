import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function POST(req: NextRequest) {
  try {
    const { id, status, txHash } = await req.json();
    const patch: any = {};
    if (status) patch.status = status;
    if (txHash) patch.txHash = txHash;

    const { data, error } = await supa
      .from("stakes")
      .update(patch)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, record: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
