// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// поддерживаемые локали (используются только внутри функции; на build это ок)
const SUPPORTED_LOCALES = ['en','ru','es','fr','zh','uk','hi'] as const;
const DEFAULT_LOCALE = 'en';

function hasLocale(pathname: string) {
  // берем первый сегмент /xx
  const first = pathname.split('/')[1];
  return (SUPPORTED_LOCALES as readonly string[]).includes(first);
}

function isPublic(req: NextRequest) {
  const p = req.nextUrl.pathname;

  // серверные/тех пути
  if (p.startsWith('/api')) return true;
  if (p.startsWith('/_next')) return true;

  // одиночные файлы в корне
  if (
    p === '/favicon.ico' ||
    p === '/robots.txt' ||
    p === '/sitemap.xml' ||
    p === '/site.webmanifest' ||
    p === '/manifest.webmanifest' ||
    p === '/manifest.json' ||
    p === '/tonconnect-manifest.json'
  ) return true;

  // статические каталоги
  if (
    p.startsWith('/decorative') ||
    p.startsWith('/assets') ||
    p.startsWith('/images') ||
    p.startsWith('/icons') ||
    p.startsWith('/favicon') ||
    p.startsWith('/fonts') ||
    p.startsWith('/docs') ||
    p.startsWith('/audit')
  ) return true;

  // расширения статических ассетов
  if (/\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|ttf|otf|woff2?|mp4|webm)$/i.test(p)) {
    return true;
  }

  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Разрешаем локализованный путь к тон-манифесту, но отдаём корневой файл
  if (pathname.endsWith('/tonconnect-manifest.json')) {
    const url = req.nextUrl.clone();
    url.pathname = '/tonconnect-manifest.json';
    return NextResponse.rewrite(url);
  }

  // Публичные пути не трогаем
  if (isPublic(req)) return NextResponse.next();

  // Если локали нет — редиректим на дефолтную, сохраняя query/hash
  if (!hasLocale(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ВАЖНО: matcher — ТОЛЬКО литеральные строки, без конкатенаций/переменных.
// Тут один «глобальный» паттерн с отрицательным просмотром вперёд.
export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|manifest.webmanifest|manifest.json|tonconnect-manifest.json|decorative|assets|images|icons|favicon|fonts|docs/|audit/|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|ttf|otf|woff2?|mp4|webm)).*)',
  ],
};
