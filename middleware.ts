// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['ru','en'] as const;
const DEFAULT_LOCALE = 'ru';

function hasLocale(pathname: string) {
  const first = pathname.split('/')[1];
  return (SUPPORTED_LOCALES as readonly string[]).includes(first);
}
function isPublic(req: NextRequest) {
  const p = req.nextUrl.pathname;
  if (p.startsWith('/api')) return true;
  if (p.startsWith('/_next')) return true;

  // корневые служебные и манифесты
  if (
    p === '/favicon.ico' ||
    p === '/robots.txt' ||
    p === '/sitemap.xml' ||
    p === '/site.webmanifest' ||
    p === '/manifest.webmanifest' ||
    p === '/manifest.json' ||
    p === '/tonconnect-manifest.json'
  ) return true;

  if (
    p.startsWith('/decorative') ||
    p.startsWith('/assets') ||
    p.startsWith('/images') ||
    p.startsWith('/icons') ||
    p.startsWith('/favicon') ||
    p.startsWith('/fonts')
  ) return true;

  if (/\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|ttf|otf|woff2?|mp4|webm)$/i.test(p)) return true;

  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // локализованные обращения к манифесту переписываем на корень
  if (pathname.endsWith('/tonconnect-manifest.json')) {
    const url = req.nextUrl.clone();
    url.pathname = '/tonconnect-manifest.json';
    return NextResponse.rewrite(url);
  }

  if (isPublic(req)) return NextResponse.next();

  if (!hasLocale(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!' +
      'api|' +
      '_next/static|' +
      '_next/image|' +
      'favicon.ico|' +
      'robots.txt|' +
      'sitemap.xml|' +
      'site.webmanifest|' +
      'manifest.webmanifest|' +
      'manifest.json|' +
      'tonconnect-manifest.json|' +
      'decorative|' +
      'assets|' +
      'images|' +
      'icons|' +
      'favicon|' +
      'fonts|' +
      '.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|ttf|otf|woff2?|mp4|webm)' +
    ').*)',
  ],
};
