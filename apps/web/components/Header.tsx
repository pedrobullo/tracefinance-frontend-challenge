"use client";

import { Typography } from "@repo/ui";
import { useTranslation } from "@/contexts/LanguageContext";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex h-[74px] w-full items-center bg-fixed-level-three px-6">
      <Typography variant="200-medium" color="fixed-primary">
        {t("pages.banking")}
      </Typography>
    </header>
  );
}
