"use client";

import { useTranslation } from "@/contexts";
import { Typography } from "@repo/ui";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={`flex gap-4 bg-level-one`}>
      <Typography as="h1" variant="400-medium" color="primary">
        {t("pages.transactions")}
      </Typography>
    </div>
  );
}
