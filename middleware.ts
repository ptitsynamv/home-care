import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'uk'];
const DEFAULT_LOCALE = 'en';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip if path already has locale
  const hasLocale = SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`));
  if (hasLocale) return;

  // 1. Try from cookie
  const cookieLocale = req.cookies.get('locale')?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return NextResponse.redirect(new URL(`/${cookieLocale}${pathname}`, req.url));
  }

  // 2. Fallback: detect from browser language
  const acceptLanguage = req.headers.get('accept-language')?.toLowerCase() || '';
  const detected = acceptLanguage.includes('uk') ? 'uk' : DEFAULT_LOCALE;

  return NextResponse.redirect(new URL(`/${detected}${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
