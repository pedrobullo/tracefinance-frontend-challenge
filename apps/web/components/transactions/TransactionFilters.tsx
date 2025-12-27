"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { Button } from "@repo/ui";

import { ActiveFilterBadges, type ActiveFilter } from "./ActiveFilterBadges";

interface TransactionFiltersProps {
  activeFilters: ActiveFilter[];
  onAddFilter?: () => void;
  onRemoveFilter: (key: string) => void;
}

export function TransactionFilters({
  activeFilters,
  onAddFilter,
  onRemoveFilter,
}: TransactionFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        hierarchy="secondary"
        size="small"
        leftIcon={<FunnelIcon />}
        onClick={onAddFilter}
      >
        Add filter
      </Button>
      <ActiveFilterBadges filters={activeFilters} onRemove={onRemoveFilter} />
    </div>
  );
}
