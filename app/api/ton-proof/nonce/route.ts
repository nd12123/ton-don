// app/api/ton-proof/nonce/route.ts
import { cookies } from "next/headers";

export async function GET() {
  const nonce = crypto.randomUUID(); // временно
  (await cookies()).set("tonproof_nonce", nonce, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 300, // 5 минут
  });

  // domain обязателен для TonConnect proof, но мы пока не валидируем
  return new Response(JSON.stringify({ nonce, domain: { lengthBytes: 0, value: "" } }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
