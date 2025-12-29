"use client";

import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  DatePicker,
  Dropdown,
  Checkbox,
  Typography,
  Button,
  type DropdownOption,
} from "@repo/ui";
import { useTranslation } from "@/contexts";
import type { FilterType } from "../FilterPanel/FilterPanel";
import type { FilterFormValues } from "../FilterMenu/FilterMenu";
import {
  getPeriodRange,
  getMonthLabels,
  detectPeriodFromRange,
  PERIOD_OPTIONS,
  type PeriodKey,
} from "@/utils/date";
import { TRANSACTION_TYPE } from "@repo/types/constants";

interface FilterContentProps {
  filterType: FilterType;
}

export function FilterContent({ filterType }: FilterContentProps) {
  const { t, language } = useTranslation();
  const { setValue, formState } = useFormContext<FilterFormValues>();
  const dateRange = useWatch<FilterFormValues, "dateRange">({
    name: "dateRange",
  });
  const type = useWatch<FilterFormValues, "type">({ name: "type" });

  const selectedPeriod = useMemo(
    () => detectPeriodFromRange(dateRange),
    [dateRange]
  );
  const monthLabels = useMemo(() => getMonthLabels(language), [language]);

  const periodOptions: DropdownOption[] = PERIOD_OPTIONS.map((period) => ({
    value: period,
    label: t(`periods.${period}`),
  }));

  const handlePeriodChange = (value: string) => {
    if (value !== "custom") {
      setValue("dateRange", getPeriodRange(value as PeriodKey), {
        shouldDirty: true,
      });
    }
  };

  const hasCompleteRange = dateRange?.start && dateRange?.end;
  const canApply = formState.isDirty && (hasCompleteRange || type !== null);

  if (filterType === "method") {
    return (
      <div className="flex h-[420px] w-[415px] flex-col items-start gap-4 rounded-r-lg bg-level-two p-6">
        <Typography variant="75-light" color="tertiary">
          {t("filterMenu.transactionType")}
        </Typography>
        <div className="flex flex-col gap-3 w-full">
          <Checkbox
            label={TRANSACTION_TYPE.PIX}
            checked={type === TRANSACTION_TYPE.PIX}
            onChange={() =>
              setValue(
                "type",
                type === TRANSACTION_TYPE.PIX ? null : TRANSACTION_TYPE.PIX,
                { shouldDirty: true }
              )
            }
          />
          <Checkbox
            label={TRANSACTION_TYPE.TED}
            checked={type === TRANSACTION_TYPE.TED}
            onChange={() =>
              setValue(
                "type",
                type === TRANSACTION_TYPE.TED ? null : TRANSACTION_TYPE.TED,
                { shouldDirty: true }
              )
            }
          />
        </div>
        {canApply && (
          <div className="mt-auto flex w-full justify-end">
            <Button type="submit" hierarchy="primary" size="small">
              {t("filterMenu.apply")}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-[420px] w-[415px] flex-col items-start gap-4 rounded-r-lg bg-level-two p-6">
      <Dropdown
        label={t("filterMenu.viewTransactionsOf")}
        placeholder={t("filterMenu.selectPeriod")}
        value={selectedPeriod}
        options={periodOptions}
        onChange={handlePeriodChange}
      />
      <div className="h-px w-full bg-border-primary" />
      <DatePicker
        value={dateRange}
        onChange={(range) =>
          setValue("dateRange", range, { shouldDirty: true })
        }
        monthLabels={monthLabels}
        fromLabel={t("filterMenu.of")}
        toLabel={t("filterMenu.to")}
      />
      {canApply && (
        <div className="mt-auto flex w-full justify-end">
          <Button type="submit" hierarchy="primary" size="small">
            {t("filterMenu.apply")}
          </Button>
        </div>
      )}
    </div>
  );
}
