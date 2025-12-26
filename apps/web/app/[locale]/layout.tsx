import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { Providers } from "@/contexts/Providers";
import { COOKIE_NAMES } from "@/constants/cookies";
import { ThemeMode } from "@/contexts/ThemeContext";
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

  // Validate locale and bypass sensitive locale checks
  if (!locales.some((l) => l.toLowerCase() === locale.toLowerCase())) {
    notFound();
  }
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(COOKIE_NAMES.THEME);

  const initialTheme: ThemeMode | undefined =
    themeCookie?.value === "light" || themeCookie?.value === "dark"
      ? themeCookie.value
      : undefined;

  return (
    <Providers initialLocale={locale as Locale} initialTheme={initialTheme}>
      {children}
    </Providers>
  );
}
