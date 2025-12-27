"use client";

import { useTranslation } from "@/contexts";
import { useTransactions } from "@/hooks/useTransactions";
import { useTransactionFilters } from "@/hooks/useTransactionFilters";
import {
  TransactionFilters,
  TransactionPagination,
  TransactionSearch,
  TransactionTabs,
  TransactionTable,
} from "@/components/transactions";
import { Typography } from "@repo/ui";

export default function Transactions() {
  const { t } = useTranslation();
  const {
    filters,
    activeTab,
    searchQuery,
    activeFilters,
    currentPage,
    setActiveTab,
    setSearchQuery,
    setPage,
    removeFilter,
  } = useTransactionFilters();

  const clientTypeFilter = activeTab === "ALL" ? undefined : activeTab;

  const { transactions, total, isLoading, hasNextPage, hasPreviousPage } =
    useTransactions({ filters, clientTypeFilter });

  const handleNextPage = () => {
    if (hasNextPage) setPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) setPage(currentPage - 1);
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
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
        />
      </div>

      <div className="flex items-center justify-between">
        <TransactionFilters
          activeFilters={activeFilters}
          onRemoveFilter={removeFilter}
        />
      </div>

      <TransactionSearch value={searchQuery} onChange={setSearchQuery} />

      <div className="rounded bg-level-two py-6">
        <TransactionTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <TransactionTable transactions={transactions} isLoading={isLoading} />
      </div>
    </div>
  );
}
