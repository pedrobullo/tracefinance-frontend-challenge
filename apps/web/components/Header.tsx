"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex h-[74px] w-full items-center bg-fixed-level-three px-6">
      <span className="text-200-medium text-fixed-primary">
        {t("pages.banking")}
      </span>
    </header>
  );
}
