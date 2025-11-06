import { notFound } from 'next/navigation';
import { i18n, type Locale, isRTL } from '@/i18n.config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!i18n.locales.includes(locale as Locale)) {
    notFound();
  }

  const direction = isRTL(locale as Locale) ? 'rtl' : 'ltr';

  return (
    <div lang={locale} dir={direction}>
      {children}
    </div>
  );
}
