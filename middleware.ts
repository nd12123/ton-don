// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// === i18n ===
const SUPPORTED_LOCALES = ['ru', 'en'] as const;
const DEFAULT_LOCALE = 'ru';

function hasLocale(pathname: string) {
  const first = pathname.split('/')[1];
  return (SUPPORTED_LOCALES as readonly string[]).includes(first);
}

// файлы, API и статика — пропускаем
function isPublic(req: NextRequest) {
  const p = req.nextUrl.pathname;

  // системные/статические пути
  if (p.startsWith('/api')) return true;
  if (p.startsWith('/_next')) return true;

  // корневые служебные файлы
  if (
    p === '/favicon.ico' ||
    p === '/robots.txt' ||
    p === '/sitemap.xml' ||
    p === '/site.webmanifest' ||
    p === '/manifest.webmanifest' ||
    p === '/manifest.json'
  ) return true;

  // tonconnect manifest (корень и любая локализованная версия)
  if (p === '/tonconnect-manifest.json') return true;
  if (p.endsWith('/tonconnect-manifest.json')) return true;

  // статика по префиксам
  if (
    p.startsWith('/decorative') ||
    p.startsWith('/assets') ||
    p.startsWith('/images') ||
    p.startsWith('/icons') ||
    p.startsWith('/favicon') ||
    p.startsWith('/fonts')
  ) return true;

  // любые файлы по расширению
  if (/\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|ttf|otf|woff2?|mp4|webm)$/i.test(p)) {
    return true;
  }

  return false;
}

// === admin-gate ===
const REALM = 'TON Stake Admin';
function isHtmlNavigation(req: NextRequest) {
  const a = req.headers.get('accept') || '';
  if (!a.includes('text/html')) return false;
  if (req.headers.get('x-middleware-prefetch') === '1') return false;
  if ((req.headers.get('purpose') || '').toLowerCase() === 'prefetch') return false;
  return req.method === 'GET';
}
function isAdminPath(pathname: string) {
  // /admin или /<locale>/admin
  return /^\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?admin(?:\/.*)?$/.test(pathname);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 0) Переписываем локализованный путь манифеста на корневой, ДО всего остального
  if (pathname.endsWith('/tonconnect-manifest.json')) {
    const url = req.nextUrl.clone();
    url.pathname = '/tonconnect-manifest.json';
    return NextResponse.rewrite(url);
  }

  // 1) файлы/API/статика — мимо
  if (isPublic(req)) return NextResponse.next();

  // 2) i18n: если путь без локали — редиректим на дефолтную
  if (!hasLocale(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 3) admin gate (только для HTML-навигаций)
  if (isAdminPath(pathname) && isHtmlNavigation(req)) {
    const ok = req.cookies.get('admin_auth')?.value === 'ok';
    if (ok) return NextResponse.next();

    const auth = req.headers.get('authorization') || '';
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':');
      if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
        const res = NextResponse.next();
        res.cookies.set('admin_auth', 'ok', {
          httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60,
        });
        return res;
      }
    }
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"` },
    });
  }

  // 4) остальное — как есть
  return NextResponse.next();
}

// матчим всё, кроме очевидной статики/сервисных путей
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
      // ВАЖНО: не исключаем tonconnect-manifest.json здесь, чтобы /ru/... попал в middleware для rewrite
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
