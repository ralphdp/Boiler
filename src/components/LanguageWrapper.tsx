"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageWrapperProps {
  children: React.ReactNode;
}

export default function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { language, isRTL } = useLanguage();

  return (
    <html lang={language} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      {children}
    </html>
  );
}
