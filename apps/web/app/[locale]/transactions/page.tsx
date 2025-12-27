"use client";

import { useTranslation } from "@/contexts";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={`flex gap-4 bg-level-one`}>
      <h1 className="text-2xl font-bold text-primary">
        {t("pages.transactions")}
      </h1>
    </div>
  );
}
