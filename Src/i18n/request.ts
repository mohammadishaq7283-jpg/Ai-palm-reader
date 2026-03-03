import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '../navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    // Note: '../../' zaroori hai
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
