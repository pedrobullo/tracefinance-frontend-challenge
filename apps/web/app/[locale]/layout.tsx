import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { Providers } from "@/contexts/Providers";
import { locales, type Locale } from "@/lib/i18n";

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

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <Providers locale={locale as Locale}>{children}</Providers>;
}
