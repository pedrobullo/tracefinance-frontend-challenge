"use client";

import { useState, useCallback } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input, Tabs } from "@repo/ui";
import { useTranslation } from "@/contexts/LanguageContext";
import { useTransactionsData } from "@/hooks";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionTable } from "./TransactionTable";
import { NewTransactionModal } from "./NewTransactionModal";

import type { TransactionFilters as FiltersType } from "@repo/types/transaction";
import type { TransactionType } from "@repo/types/constants";

const TAB_OPTIONS = [
  { id: "all", label: "All" },
  { id: "TED", label: "TED" },
  { id: "PIX", label: "PIX" },
] as const;

export function TransactionList() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FiltersType>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Monta os filtros baseado nas seleções
  const queryFilters: FiltersType = {
    ...filters,
    search: searchQuery || undefined,
    type: activeTab !== "all" ? (activeTab as TransactionType) : filters.type,
  };

  const {
    transactions,
    total,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isEmpty,
    isError,
    refetch,
  } = useTransactionsData(queryFilters);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const handleApplyFilters = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery("");
    setActiveTab("all");
  }, []);

  // Formata o contador de resultados
  const displayedCount = transactions.length;
  const resultText = `1-${displayedCount} ${t.common.of} ${total}`;

  return (
    <div className="space-y-6">
      {/* Header com título e botão de nova transação */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary dark:text-text-inverse">
          {t.transactions.title}
        </h1>
        <Button
          leftIcon={<PlusIcon className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: "#00F2B1" }}
        >
          {t.transactions.newTransaction}
        </Button>
      </div>

      {/* Filtros e contador */}
      <div className="flex items-center justify-between">
        <TransactionFilters
          filters={filters}
          onFiltersChange={setFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <span>{resultText}</span>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-dark-card rounded">
              ‹
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-dark-card rounded">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Barra de pesquisa */}
      <div className="relative">
        <Input
          placeholder={t.transactions.searchById}
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          leftIcon={<MagnifyingGlassIcon className="w-4 h-4" />}
        />
      </div>

      {/* Tabs de tipo */}
      <Tabs
        tabs={TAB_OPTIONS.map((tab) => ({
          id: tab.id,
          label: tab.id === "all" ? t.transactions.all : tab.label,
        }))}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Tabela de transações */}
      <TransactionTable
        transactions={transactions}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage ?? false}
        fetchNextPage={fetchNextPage}
        isEmpty={isEmpty}
        isError={isError}
        onRetry={() => refetch()}
      />

      {/* Modal de nova transação */}
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
