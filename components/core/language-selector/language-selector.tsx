'use client';

import { useState, useEffect } from 'react';
import { i18n, localeNames, type Locale } from '@/i18n.config';

export function LanguageSelector() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check locale on mount
    const checkLocale = () => {
      setMounted(true);
      const locale = (localStorage.getItem('locale') as Locale) || i18n.defaultLocale;
      setCurrentLocale(locale);
    };

    checkLocale();
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    setCurrentLocale(locale);
    localStorage.setItem('locale', locale);
    // In a full implementation, this would update the URL and reload with the new locale
    window.location.href = `/${locale}`;
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        className="px-3 py-2 pr-8 border rounded-md bg-background text-foreground appearance-none cursor-pointer hover:bg-accent transition-colors"
      >
        {i18n.locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
