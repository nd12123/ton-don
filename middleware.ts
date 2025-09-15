// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// === i18n ===
const SUPPORTED_LOCALES = ['ru', 'en'] as const
const DEFAULT_LOCALE = 'ru' // ← поменяй при необходимости

function hasLocale(pathname: string) {
  const first = pathname.split('/')[1]
  return SUPPORTED_LOCALES.includes(first as any)
}

// файлы, API и статика — пропускаем
function isPublic(req: NextRequest) {
  const p = req.nextUrl.pathname
  if (p.startsWith('/api')) return true
  if (p.startsWith('/_next')) return true
  if (p === '/favicon.ico' || p === '/robots.txt' || p === '/sitemap.xml') return true
  if (/\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|map|txt|ttf|woff2?)$/i.test(p)) return true
  return false
}

// === admin-gate ===
const REALM = 'TON Stake Admin'
function isHtmlNavigation(req: NextRequest) {
  const a = req.headers.get('accept') || ''
  if (!a.includes('text/html')) return false
  if (req.headers.get('x-middleware-prefetch') === '1') return false
  if ((req.headers.get('purpose') || '').toLowerCase() === 'prefetch') return false
  return req.method === 'GET'
}
function isAdminPath(pathname: string) {
  // /admin или /<locale>/admin
  return /^\/(?:[a-z]{2}(?:-[A-Z]{2})?\/)?admin(?:\/.*)?$/.test(pathname)
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 0) файлы/API — мимо
  if (isPublic(req)) return NextResponse.next()

  // 1) i18n: если путь без локали — редиректим на дефолтную
  if (!hasLocale(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`
    return NextResponse.redirect(url)
  }

  // 2) admin gate (только для HTML-навигаций)
  if (isAdminPath(pathname) && isHtmlNavigation(req)) {
    const ok = req.cookies.get('admin_auth')?.value === 'ok'
    if (ok) return NextResponse.next()

    const auth = req.headers.get('authorization') || ''
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':')
      if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
        const res = NextResponse.next()
        res.cookies.set('admin_auth', 'ok', {
          httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60,
        })
        return res
      }
    }
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"` },
    })
  }

  // 3) остальное — как есть
  return NextResponse.next()
}

// матчим ВСЁ, кроме _next, api и файлов с расширением
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
