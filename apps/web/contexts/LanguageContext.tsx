"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  useMemo,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";

import i18n from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface LanguageContextValue {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  locale: Locale;
}

export function LanguageProvider({ children, locale }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  const setLanguage = (lang: Locale) => {
    const newPath = pathname.replace(`/${locale}`, `/${lang}`);
    router.push(newPath);
  };

  const t = (key: string, options?: Record<string, unknown>) =>
    i18n.t(key, options);

  const value = useMemo(
    () => ({ language: locale, setLanguage, t }),
    [locale, pathname]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useTranslation must be used within LanguageProvider");
  return context;
}
