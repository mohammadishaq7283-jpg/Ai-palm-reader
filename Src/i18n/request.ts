import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '../navigation'; // <-- Note: '../' ho gaya hai

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    // Note: '../../' kyunki ab hum src/i18n/ folder ke andar hain
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
