// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en","ru","es","fr","zh","uk","hi"] as const;
const DEFAULT_LOCALE = "ru"; // <-- фиксируем RU по умолчанию

const LOCALE_RE = /^\/([a-z]{2}(?:-[A-Z]{2})?)(?:\/|$)/;

function hasSupportedLocale(pathname: string) {
  const m = LOCALE_RE.exec(pathname);
  return !!(m && SUPPORTED_LOCALES.includes(m[1] as any));
}

function isStatic(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/site.webmanifest" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/manifest.json" ||
    pathname.startsWith("/decorative") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/docs") ||
    pathname.startsWith("/audit") ||
    /\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|ttf|otf|woff2?|mp4|webm)$/i.test(pathname)
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // пропускаем статику/апи
  if (isStatic(pathname)) return NextResponse.next();

  // корневой манифест пропускаем
  if (pathname === "/tonconnect-manifest.json") return NextResponse.next();

  // локализованный манифест -> корневой
  if (/^\/[a-z]{2}(?:-[A-Z]{2})?\/tonconnect-manifest\.json$/.test(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/tonconnect-manifest.json";
    return NextResponse.rewrite(url);
  }

  // terms/privacy -> английская версия (rewrite, без смены урла в адресной строке)
  if (pathname === "/terms" || pathname === "/privacy") {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.rewrite(url);
  }

  // если уже есть поддерживаемая локаль — пропускаем
  if (hasSupportedLocale(pathname)) return NextResponse.next();

  // иначе — редирект на дефолтную локаль, сохраняя путь и query
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|manifest.webmanifest|manifest.json|tonconnect-manifest.json|decorative|assets|images|icons|favicon|fonts|docs/|audit/|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|ttf|otf|woff2?|mp4|webm)).*)",
  ],
};
