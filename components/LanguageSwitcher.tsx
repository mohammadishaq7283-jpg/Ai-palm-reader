'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../src/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.replace(pathname, { locale: newLocale });
    localStorage.setItem('mystic-lang', newLocale);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={handleChange}
        className="appearance-none bg-mystic-800/50 border border-mystic-500 text-mystic-100 py-1 px-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer text-sm"
      >
        <option value="en">English</option>
        <option value="ur">اردو</option>
        <option value="hi">हिंदी</option>
        <option value="ar">العربية</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-mystic-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}
