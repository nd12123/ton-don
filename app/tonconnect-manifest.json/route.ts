import { NextResponse } from 'next/server';

const manifest = {
  url: 'https://tonstaker.io',
  name: 'TON Staker',
  iconUrl: 'https://tonstaker.io/icons/icon-192.png',
  termsOfUseUrl: 'https://tonstaker.io/terms',
  privacyPolicyUrl: 'https://tonstaker.io/privacy',
};

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=600',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  return NextResponse.json(manifest, { headers });
}

export async function HEAD() {
  return new NextResponse(null, { status: 200, headers });
}
