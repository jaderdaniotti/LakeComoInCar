'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    // Se la nuova lingua è la stessa, non fare nulla
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // Ottieni il pathname senza il prefisso della lingua corrente
    let pathnameWithoutLocale = pathname;
    
    // Rimuovi qualsiasi prefisso di lingua dal pathname (incluso /it)
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`)) {
        pathnameWithoutLocale = pathname.replace(`/${loc}`, '');
        break;
      } else if (pathname === `/${loc}`) {
        pathnameWithoutLocale = '/';
        break;
      }
    }
    
    // Se il pathname non inizia con un prefisso di lingua, potrebbe essere già senza prefisso
    // (caso in cui siamo sulla homepage italiana senza /it)
    // In questo caso, manteniamo il pathname così com'è
    
    // Normalizza: se è vuoto, usa '/'
    if (!pathnameWithoutLocale || pathnameWithoutLocale === '') {
      pathnameWithoutLocale = '/';
    }
    
    // Costruisci il nuovo path con prefisso per TUTTE le lingue (incluso italiano)
    const newPath = pathnameWithoutLocale === '/' 
      ? `/${newLocale}` 
      : `/${newLocale}${pathnameWithoutLocale}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Desktop: Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-black font-medium uppercase text-sm tracking-wider hover:text-gray-600 transition-colors duration-200"
        aria-label="Select language"
      >
        <Globe size={18} />
        <span className="hidden md:inline">{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-black shadow-xl z-50">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-full text-left px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                  locale === loc
                    ? 'bg-black text-white'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{localeNames[loc]}</span>
                  <span className="text-xs opacity-70">{loc.toUpperCase()}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
