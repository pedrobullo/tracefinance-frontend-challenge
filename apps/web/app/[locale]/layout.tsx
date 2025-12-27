import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { locales, type Locale } from "@/lib/i18n";
import { MainLayout } from "@/components";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale and bypass sensitive locale checks
  if (!locales.some((l) => l.toLowerCase() === locale.toLowerCase())) {
    notFound();
  }

  return (
    <LanguageProvider locale={locale as Locale}>
      <MainLayout>{children}</MainLayout>
    </LanguageProvider>
  );
}
