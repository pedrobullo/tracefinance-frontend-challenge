"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FilterPanel, type FilterType } from "./FilterPanel";
import { FilterContent } from "./FilterContent";
import type { MonthRange } from "@repo/ui";
import type { TransactionType } from "@repo/types/constants";

export interface FilterFormValues {
  dateRange: MonthRange;
  type: TransactionType | null;
}

export interface FilterMenuProps {
  defaultValues: FilterFormValues;
  onApply: (values: FilterFormValues) => void;
  onClose: () => void;
  className?: string;
}

export function FilterMenu({
  defaultValues,
  onApply,
  onClose,
  className,
}: FilterMenuProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("date");
  const methods = useForm<FilterFormValues>({ defaultValues });

  const onSubmit = (data: FilterFormValues) => {
    onApply(data);
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={`absolute left-0 top-[48px] z-10 flex w-[650px] overflow-hidden rounded-lg bg-level-one shadow-dropdown ${className || ""}`}
        role="dialog"
        aria-modal="true"
      >
        <FilterPanel
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <FilterContent filterType={activeFilter} />
      </form>
    </FormProvider>
  );
}
