"use client";

import { CalendarIcon } from "@heroicons/react/24/outline";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { FilterPanelItem } from "./FilterPanelItem";
import { useTranslation } from "@/contexts";

export type FilterType = "date" | "method";

export interface FilterPanelProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterPanel({
  activeFilter,
  onFilterChange,
}: FilterPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="flex h-[420px] w-[235px] flex-col items-start gap-2 rounded-l-lg bg-level-one p-6">
      <FilterPanelItem
        icon={<CalendarIcon />}
        label={t("filterMenu.date")}
        isActive={activeFilter === "date"}
        onClick={() => onFilterChange("date")}
      />
      <FilterPanelItem
        icon={<ArrowsRightLeftIcon />}
        label={t("filterMenu.method")}
        isActive={activeFilter === "method"}
        onClick={() => onFilterChange("method")}
      />
    </div>
  );
}
