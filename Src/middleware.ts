import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './src/navigation';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  localePrefix
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ur|hi|ar|es|fr)/:path*']
};
