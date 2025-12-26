"use client";

import { useTranslation } from "@/contexts";

export default function Home() {
  const { setLanguage, t, language } = useTranslation();

  return (
    <div className="flex gap-4 p-8">
      <h1 className="text-2xl font-bold">
        {t("pages.transactions")}dasdsadsad
      </h1>
    </div>
  );
}
