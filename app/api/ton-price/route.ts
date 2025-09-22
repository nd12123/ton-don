// app/api/ton-price/route.ts
import { NextResponse } from "next/server";

export const revalidate = 60;           // ISR для edge/node рунтайма (1 мин)
export const runtime = "nodejs";        // либо "edge", если хочешь

// провайдеры: пробуем по очереди и берём первый успешный
async function fromCoingecko() {
  const r = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd",
    { next: { revalidate: 60 } }
  );
  if (!r.ok) throw new Error(`coingecko ${r.status}`);
  const j = await r.json();
  const usd = Number(j?.["the-open-network"]?.usd);
  if (!Number.isFinite(usd)) throw new Error("coingecko payload");
  return { usd, source: "coingecko" as const };
}

async function fromCryptoCompare() {
  const r = await fetch(
    "https://min-api.cryptocompare.com/data/price?fsym=TON&tsyms=USD",
    { next: { revalidate: 60 } }
  );
  if (!r.ok) throw new Error(`cryptocompare ${r.status}`);
  const j = await r.json();
  const usd = Number(j?.USD);
  if (!Number.isFinite(usd)) throw new Error("cryptocompare payload");
  return { usd, source: "cryptocompare" as const };
}

export async function GET() {
  try {
    let data;
    try {
      data = await fromCoingecko();
    } catch {
      data = await fromCryptoCompare();
    }
    return NextResponse.json(
      { usd: data.usd, source: data.source, at: Date.now() },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (e) {
    // не падаем — отдаём {usd:0}, чтобы UI жил
    return NextResponse.json(
      { usd: 0, source: "fallback", at: Date.now(), error: true },
      { status: 200 }
    );
  }
}
