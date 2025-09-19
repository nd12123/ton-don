import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { address } = await req.json().catch(() => ({ address: "" }));
  const list = (process.env.NEXT_PUBLIC_ADMIN_WALLETS || "")
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  if (!address || !list.includes(address.toLowerCase())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });
  return res;
}
