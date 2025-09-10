import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // статика и API — пропускаем
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return;
  }

  // уже есть локаль в пути?
  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocale) return;

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
};
