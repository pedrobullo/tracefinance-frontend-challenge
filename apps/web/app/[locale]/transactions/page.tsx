"use client";

import { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "@/contexts";
import {
  useTransactions,
  useTransactionFilters,
  useOnClickOutside,
  useCreateTransaction,
} from "@/hooks";
import {
  TransactionFilters,
  TransactionPagination,
  TransactionSearch,
  TransactionTabs,
  TransactionTable,
} from "@/components/transactions";
import { FilterMenu, type FilterFormValues } from "@/components/filter-menu";
import { TransactionFormModal } from "@/components/transaction-form";
import { Typography, Button } from "@repo/ui";
import { PlusIcon } from "@heroicons/react/24/outline";
import type { CreateTransactionInput } from "@repo/types/schemas";

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
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  const clientTypeFilter = activeTab === "ALL" ? undefined : activeTab;

  useOnClickOutside(
    filterMenuRef,
    useCallback(() => setIsFilterMenuOpen(false), []),
    isFilterMenuOpen
  );

  const { transactions, total, isLoading, hasNextPage, hasPreviousPage } =
    useTransactions({ filters, clientTypeFilter });

  const createTransaction = useCreateTransaction();

  const handleApplyFilters = useCallback(
    (values: FilterFormValues) => {
      setFilters({ dateRange: values.dateRange, type: values.type ?? "ALL" });
      toast.success(t("filters.applied"));
      setIsFilterMenuOpen(false);
    },
    [setFilters, t]
  );

  const filterDefaultValues: FilterFormValues = {
    dateRange,
    type: activeTab === "ALL" ? null : activeTab,
  };

  const handleCreateTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      try {
        await createTransaction.mutateAsync(data);
        toast.success(t("transactionForm.created"));
        setIsTransactionModalOpen(false);
      } catch {
        toast.error(t("transactionForm.error"));
      }
    },
    [createTransaction, t]
  );

  return (
    <div className="flex flex-col gap-6 bg-level-one min-h-full">
      <div className="flex items-center gap-4">
        <Typography as="h1" variant="400-medium" color="primary">
          {t("pages.transactions")}
        </Typography>
        <Button
          hierarchy="primary"
          size="medium"
          onClick={() => setIsTransactionModalOpen(true)}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          {t("transactionForm.newTransaction")}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative">
          <TransactionFilters
            activeFilters={activeFilters}
            onRemoveFilter={removeFilter}
            onAddFilter={() => setIsFilterMenuOpen((prev) => !prev)}
          />
          {isFilterMenuOpen && (
            <div ref={filterMenuRef} className="absolute top-full left-0 z-50">
              <FilterMenu
                defaultValues={filterDefaultValues}
                onApply={handleApplyFilters}
                onClose={() => setIsFilterMenuOpen(false)}
              />
            </div>
          )}
        </div>
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

      <TransactionSearch
        value={searchQuery}
        onChange={(query) => setFilters({ search: query })}
      />

      <div className="p-6 rounded bg-level-two">
        <TransactionTabs
          activeTab={activeTab}
          activeStatus={filters.status}
          onTabChange={(tab) => setFilters({ type: tab })}
          onStatusChange={(status) => setFilters({ status })}
        />
        <TransactionTable transactions={transactions} isLoading={isLoading} />
      </div>

      <TransactionFormModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSubmit={handleCreateTransaction}
      />
    </div>
  );
}
