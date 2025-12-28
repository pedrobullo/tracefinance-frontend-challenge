"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslation } from "@/contexts";
import {
  useTransactions,
  useTransactionFilters,
  useOnClickOutside,
} from "@/hooks";
import {
  TransactionFilters,
  TransactionPagination,
  TransactionSearch,
  TransactionTabs,
  TransactionTable,
} from "@/components/transactions";
import { FilterMenu, type FilterFormValues } from "@/components/filter-menu";
import { Typography } from "@repo/ui";

export default function Transactions() {
  const { t } = useTranslation();
  const {
    filters,
    activeTab,
    searchQuery,
    activeFilters,
    currentPage,
    dateRange,
    setFilters,
    removeFilter,
  } = useTransactionFilters();

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  const clientTypeFilter = activeTab === "ALL" ? undefined : activeTab;

  useOnClickOutside(
    filterMenuRef,
    useCallback(() => setIsFilterMenuOpen(false), []),
    isFilterMenuOpen
  );

  const { transactions, total, isLoading, hasNextPage, hasPreviousPage } =
    useTransactions({ filters, clientTypeFilter });

  const handleApplyFilters = useCallback(
    (values: FilterFormValues) => {
      setFilters({ dateRange: values.dateRange, type: values.type ?? "ALL" });
    },
    [setFilters]
  );

  const filterDefaultValues: FilterFormValues = {
    dateRange,
    type: activeTab === "ALL" ? null : activeTab,
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-level-one min-h-full">
      <div className="flex items-center justify-between">
        <Typography as="h1" variant="400-medium" color="primary">
          {t("pages.transactions")}
        </Typography>
        <TransactionPagination
          currentPage={currentPage}
          totalItems={total}
          itemsPerPage={filters.limit || 20}
          onPreviousPage={() =>
            hasPreviousPage && setFilters({ page: currentPage - 1 })
          }
          onNextPage={() =>
            hasNextPage && setFilters({ page: currentPage + 1 })
          }
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
        />
      </div>

      <div className="relative flex items-center justify-between">
        <TransactionFilters
          activeFilters={activeFilters}
          onRemoveFilter={removeFilter}
          onAddFilter={() => setIsFilterMenuOpen(true)}
        />
        {isFilterMenuOpen && (
          <div ref={filterMenuRef}>
            <FilterMenu
              defaultValues={filterDefaultValues}
              onApply={handleApplyFilters}
              onClose={() => setIsFilterMenuOpen(false)}
            />
          </div>
        )}
      </div>

      <TransactionSearch
        value={searchQuery}
        onChange={(query) => setFilters({ search: query })}
      />

      <div className="rounded bg-level-two py-6">
        <TransactionTabs
          activeTab={activeTab}
          activeStatus={filters.status}
          onTabChange={(tab) => setFilters({ type: tab })}
          onStatusChange={(status) => setFilters({ status })}
        />
        <TransactionTable transactions={transactions} isLoading={isLoading} />
      </div>
    </div>
  );
}
