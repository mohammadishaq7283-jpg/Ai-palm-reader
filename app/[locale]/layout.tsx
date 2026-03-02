import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import "../globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/src/navigation";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-cinzel' });

export const metadata: Metadata = {
  title: "AI Mystic - Global Palm & Tarot Reader",
  description: "Unlock your destiny with AI-powered palmistry and tarot readings.",
};

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  const dir = (locale === 'ar' || locale === 'ur') ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.className} ${cinzel.variable} bg-mystic-900 text-white min-h-screen overflow-x-hidden`}>
        <div className="fixed inset-0 bg-mystic-gradient -z-10"></div>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="fixed top-0 w-full z-50 bg-mystic-900/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold font-serif text-gold-500 flex items-center gap-2">
                <span>🔮</span> AI Mystic
              </Link>
              <LanguageSwitcher />
            </div>
          </header>
          <main className="pt-24 pb-12 min-h-screen container mx-auto px-4">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
