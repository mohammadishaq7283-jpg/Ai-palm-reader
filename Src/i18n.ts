import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './navigation';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    // Note: '../messages' kyunki file ab src folder mein hai
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
