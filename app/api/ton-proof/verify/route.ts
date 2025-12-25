import { cookies } from "next/headers";
import { Address } from "@ton/core";

function norm(a: string) {
  try { return Address.parse(a).toRawString(); }
  catch { return (a || "").trim().toLowerCase(); }
}

function adminList() {
  const raw = process.env.ADMIN_AWALLETS || process.env.NEXT_PUBLIC_ADMIN_WALLETS || "";
  return raw.split(",").map(s => s.trim()).filter(Boolean).map(norm);
}

export async function POST(req: Request) {
  const c = await cookies();
  const cookieNonce = c.get("tonproof_nonce")?.value || "";

  let body: any;
  try {
    body = await req.json();
  } catch {
    console.error("[verify] bad JSON");
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const { address, network, proof } = body || {};
  // ожидаем: address: string, network: 'testnet'|'mainnet'|number, proof: { payload: string, state_init?: string, signature?: string, timestamp?: number, domain?: { length:number, value:string } }

  if (!address || !proof?.payload) {
    console.error("[verify] missing fields", { hasAddress: !!address, hasPayload: !!proof?.payload });
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  // 1) проверяем соответствие nonce
  if (cookieNonce.length === 0) {
    console.error("[verify] no cookie nonce");
    return Response.json({ ok: false, error: "no_nonce" }, { status: 400 });
  }
  if (cookieNonce !== proof.payload) {
    console.error("[verify] nonce mismatch", { cookieNonce, payload: proof.payload });
    return Response.json({ ok: false, error: "nonce_mismatch" }, { status: 400 });
  }

  // 2) (упрощённо) нормализуем адрес и сравним со списком админов
  const addrRaw = norm(address);
  const allow = new Set(adminList());

  console.log("[verify] ENV allow list:", Array.from(allow));
  console.log("[verify] address:", address, "→", addrRaw, "network:", network);

  const isAdmin = allow.has(addrRaw);
  if (!isAdmin) {
    // не админ — не ставим куки
    return Response.json({ ok: true, admin: false }, { status: 200 });
  }

  // 3) ставим куки с отметкой, кого впустили
  c.set("admin_ok", "1", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 3600, path: "/" });
  c.set("admin_addr", addrRaw, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 3600, path: "/" });

  return Response.json({ ok: true, admin: true }, { status: 200 });
}
