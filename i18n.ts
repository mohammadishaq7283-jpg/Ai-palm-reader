import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Locales yahan direct likh rahe hain taake koi import error na aaye
const locales = ['en', 'ur', 'hi', 'ar', 'es', 'fr'];

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (!locales.includes(locale as any)) notFound();

  return {
    // ./messages folder root mein hai, isliye yahan ../ ki zaroorat nahi
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
