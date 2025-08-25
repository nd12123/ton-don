// app/api/cron/stakes/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// import type { Database } from "@/lib/types/supabase"; // если у вас есть типы

export const runtime = "nodejs";            // безопаснее для supabase-js
export const dynamic = "force-dynamic";     // не пытаться статически оптимизировать

export async function GET() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || // предпочтительно для cron
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Missing Supabase envs:", { hasUrl: !!url, hasKey: !!key });
    return NextResponse.json(
      { ok: false, error: "Supabase env not set" },
      { status: 500 }
    );
  }

  // const supabase = createClient<Database>(url, key, { auth: { persistSession: false } });
  const supabase = createClient(url, key, { auth: { persistSession: false } });
    console.log(supabase)
  // ... ваша логика апдейта стейков ...
  // await supabase.from("stakes").update(...)

  return NextResponse.json({ ok: true });
}
