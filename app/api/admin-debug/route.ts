// app/api/admin-debug/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Address } from "@ton/core";

function addrKey(s?: string | null) {
  if (!s) return null;
  try {
    const a = Address.parse(s);
    return `${a.workChain}:${Buffer.from(a.hash).toString("hex")}`;
  } catch {
    return null;
  }
}

export async function GET() {
  const c = await cookies();
  const okCookie = c.get("admin_ok")?.value === "1";
  const addrCookie = c.get("admin_addr")?.value || "";
  const keyCookie = addrKey(addrCookie);

  const rawEnv =
    process.env.ADMIN_WALLETS || process.env.NEXT_PUBLIC_ADMIN_WALLETS || "";
  const list = rawEnv.split(",").map(s => s.trim()).filter(Boolean);
  const detailed = list.map(input => ({ input, key: addrKey(input) }));
  const set = new Set(detailed.filter(d => d.key).map(d => d.key as string));
  const inSet = !!keyCookie && set.has(keyCookie);

  return NextResponse.json(
    {
      rawEnv,
      admins: detailed,           // [{ input, key }]
      cookie: { okCookie, addrCookie, keyCookie },
      computed: { inSet, isAdmin: okCookie && inSet },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
