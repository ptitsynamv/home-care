import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'uk'];
const DEFAULT_LOCALE = 'en';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip if path already has a locale (/en or /uk)
  const hasLocale = SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`));
  if (hasLocale) return;

  // Detect language from headers
  const acceptLanguage = req.headers.get('accept-language');
  let detectedLocale = DEFAULT_LOCALE;

  if (acceptLanguage) {
    if (acceptLanguage.toLowerCase().includes('uk')) {
      detectedLocale = 'uk';
    } else if (acceptLanguage.toLowerCase().includes('en')) {
      detectedLocale = 'en';
    }
  }

  // Redirect to locale path
  return NextResponse.redirect(new URL(`/${detectedLocale}${pathname}`, req.url));
}

export const config = {
  matcher: [
    /*
     * Skip paths that shouldn’t be localized (like API routes, _next, static assets, etc.)
     */
    '/((?!api|_next|.*\\..*).*)',
  ],
};
