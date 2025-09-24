// app/tonconnect-manifest.json/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 600;

const manifest = {
  url: 'https://tonstaker.io',
  name: 'TON Staker',
  iconUrl: 'https://tonstaker.io/favicon.svg',
  termsOfUseUrl: 'https://tonstaker.io/terms',
  privacyPolicyUrl: 'https://tonstaker.io/privacy',
};

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=600, s-maxage=600',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function GET(req: Request) {
  console.log('[TC] GET manifest', { ua: req.headers.get('user-agent') });
  return NextResponse.json(manifest, { headers });
}
export function HEAD(req: Request) {
  console.log('[TC] HEAD manifest', { ua: req.headers.get('user-agent') });
  return new NextResponse(null, { status: 200, headers });
}
export function OPTIONS(req: Request) {
  console.log('[TC] OPTIONS manifest', { ua: req.headers.get('user-agent') });
  return new NextResponse(null, { status: 204, headers });
}
