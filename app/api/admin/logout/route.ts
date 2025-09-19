// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
export async function POST() {
  const res = NextResponse.json({ ok:true });
  res.cookies.set("admin_ok","",{ path:"/", maxAge:0 });
  res.cookies.set("admin_addr","",{ path:"/", maxAge:0 });
  return res;
}
