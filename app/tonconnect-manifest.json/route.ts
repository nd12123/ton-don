// app/tonconnect-manifest.json/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 600;

const manifest = {
  url: 'https://tonstaker.io',
  name: 'TON Staker',
  // РЕКОМЕНДУЮ PNG 192x192. Если хочешь проверить SVG — поменяй тут на свой SVG,
  // но для совместимости лучше PNG.
  iconUrl: 'https://tonstaker.io/favicon.svg',
  termsOfUseUrl: 'https://tonstaker.io/terms',
  privacyPolicyUrl: 'https://tonstaker.io/privacy',
};

const headers: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=600, s-maxage=600',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  return NextResponse.json(manifest, { headers });
}
export async function HEAD() {
  return new NextResponse(null, { status: 200, headers });
}
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers });
}
