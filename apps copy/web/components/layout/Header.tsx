"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="h-16 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border px-6 flex items-center">
      <h1 className="text-sm font-medium text-text-secondary dark:text-text-muted">
        {t("sidebar.banking")}
      </h1>
    </header>
  );
}
