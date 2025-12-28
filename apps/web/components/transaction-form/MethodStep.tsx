"use client";

import { useFormContext } from "react-hook-form";

import { Typography } from "@repo/ui";
import { TRANSACTION_TYPE } from "@repo/types/constants";
import type { TransactionType } from "@repo/types/schemas";
import { useTranslation } from "@/contexts";

interface MethodStepProps {
  selectedType: TransactionType;
}

export function MethodStep({ selectedType }: MethodStepProps) {
  const { t } = useTranslation();
  const { setValue } = useFormContext();

  const methods = [
    { value: TRANSACTION_TYPE.TED, label: "TED" },
    { value: TRANSACTION_TYPE.PIX, label: "PIX" },
  ];

  return (
    <div className="flex flex-col gap-10">
      <Typography
        as="h1"
        variant="400-medium"
        color="primary"
        className="text-4xl font-bold"
      >
        {t("transactionForm.methodTitle")}
      </Typography>
      <div className="flex flex-col gap-3">
        {methods.map((method) => {
          const isSelected = selectedType === method.value;
          return (
            <button
              key={method.value}
              type="button"
              onClick={() => setValue("type", method.value)}
              className={`
                flex items-center gap-2 p-5 px-6 rounded-lg bg-level-two
                transition-colors cursor-pointer
                ${isSelected ? "ring-2 ring-brand-primary" : ""}
              `}
            >
              <div
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? "border-brand-primary" : "border-border-secondary"}
                `}
              >
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-brand-primary" />
                )}
              </div>
              <Typography
                variant="200-medium"
                color="primary"
                className="text-lg"
              >
                {method.label}
              </Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
}
