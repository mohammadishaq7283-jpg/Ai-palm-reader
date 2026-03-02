import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ur', 'hi', 'ar', 'es', 'fr'] as const;
export const localePrefix = 'always'; // Default

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
