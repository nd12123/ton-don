// app/api/ton-proof/verify/route.ts
import { cookies } from "next/headers";
import { Address } from "@ton/core";

function parseAllowedRaw(list: string): string[] {
  return list
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => {
      try { return Address.parse(s).toRawString(); } catch { return s.includes(":") ? s : ""; }
    })
    .filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const address: string | undefined = body?.address;

    // проверим, что nonce из куки вообще был выдан (минимальная связность)
    const c = await cookies();
    const nonce = c.get("tonproof_nonce")?.value;
    if (!nonce) {
      return new Response(JSON.stringify({ ok: false, error: "nonce_missing" }), { status: 400 });
    }

    if (!address) {
      return new Response(JSON.stringify({ ok: false, error: "address_missing" }), { status: 400 });
    }

    // нормализуем пользовательский адрес
    let userRaw: string;
    try { userRaw = Address.parse(address).toRawString(); }
    catch { return new Response(JSON.stringify({ ok: false, error: "address_invalid" }), { status: 400 }); }

    const allowed = parseAllowedRaw(process.env.NEXT_PUBLIC_ADMIN_ADDRESSES || "");

    if (!allowed.includes(userRaw)) {
      return new Response(JSON.stringify({ ok: false, error: "forbidden" }), { status: 403 });
    }

    // пометить, что прошёл проверку (минимально)
    c.set("admin_proof", "ok", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), { status: 500 });
  }
}
