"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  TRANSACTION_FILTER_KEYS,
  type TransactionFilters,
} from "@repo/types/transaction";
import {
  TRANSACTION_TYPE,
  type TransactionStatus,
  type Currency,
  type TransactionType,
} from "@repo/types/constants";
import { useTranslation } from "@/contexts";

type TabValue = "ALL" | TransactionType;

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

interface UseTransactionFilters {
  filters: TransactionFilters;
  activeTab: TabValue;
  searchQuery: string;
  activeFilters: ActiveFilter[];
  hasActiveFilters: boolean;
  currentPage: number;
  setActiveTab: (tab: TabValue) => void;
  setSearchQuery: (query: string) => void;
  setStatus: (status: TransactionStatus | undefined) => void;
  setCurrency: (currency: Currency | undefined) => void;
  setPage: (page: number) => void;
  removeFilter: (key: string) => void;
  resetFilters: () => void;
}

export function useTransactionFilters(): UseTransactionFilters {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      if (updates.page === undefined && !("page" in updates)) {
        params.delete("page");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const activeTab = useMemo<TabValue>(() => {
    const type = searchParams.get(TRANSACTION_FILTER_KEYS.TYPE);
    if (type === TRANSACTION_TYPE.PIX || type === TRANSACTION_TYPE.TED)
      return type;
    return "ALL";
  }, [searchParams]);

  const searchQuery = searchParams.get(TRANSACTION_FILTER_KEYS.SEARCH) ?? "";
  const currentPage = parseInt(
    searchParams.get(TRANSACTION_FILTER_KEYS.PAGE) ?? "1",
    10
  );

  const filters = useMemo<TransactionFilters>(() => {
    const result: TransactionFilters = {
      page: currentPage,
      limit: 20,
    };

    const status = searchParams.get(
      TRANSACTION_FILTER_KEYS.STATUS
    ) as TransactionStatus | null;
    if (status) result.status = status;

    const currency = searchParams.get(
      TRANSACTION_FILTER_KEYS.CURRENCY
    ) as Currency | null;
    if (currency) result.currency = currency;

    const search = searchParams.get(TRANSACTION_FILTER_KEYS.SEARCH);
    if (search) result.search = search;

    const startDate = searchParams.get(TRANSACTION_FILTER_KEYS.START_DATE);
    if (startDate) result.startDate = startDate;

    const endDate = searchParams.get(TRANSACTION_FILTER_KEYS.END_DATE);
    if (endDate) result.endDate = endDate;

    return result;
  }, [searchParams, currentPage]);

  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const result: ActiveFilter[] = [];

    const status = searchParams.get(
      TRANSACTION_FILTER_KEYS.STATUS
    ) as TransactionStatus | null;
    if (status) {
      result.push({
        key: TRANSACTION_FILTER_KEYS.STATUS,
        label: t("filters.status"),
        value: t(`status.${status}`),
      });
    }

    const currency = searchParams.get(TRANSACTION_FILTER_KEYS.CURRENCY);
    if (currency) {
      result.push({
        key: TRANSACTION_FILTER_KEYS.CURRENCY,
        label: t("filters.currency"),
        value: currency,
      });
    }

    const search = searchParams.get(TRANSACTION_FILTER_KEYS.SEARCH);
    if (search) {
      result.push({
        key: TRANSACTION_FILTER_KEYS.SEARCH,
        label: t("filters.search"),
        value: `"${search}"`,
      });
    }

    return result;
  }, [searchParams, t]);

  const hasActiveFilters = activeFilters.length > 0 || activeTab !== "ALL";

  const setActiveTab = useCallback(
    (tab: TabValue) => {
      updateParams({
        [TRANSACTION_FILTER_KEYS.TYPE]: tab === "ALL" ? undefined : tab,
        [TRANSACTION_FILTER_KEYS.PAGE]: undefined,
      });
    },
    [updateParams]
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      updateParams({
        [TRANSACTION_FILTER_KEYS.SEARCH]: query || undefined,
        [TRANSACTION_FILTER_KEYS.PAGE]: undefined,
      });
    },
    [updateParams]
  );

  const setStatus = useCallback(
    (status: TransactionStatus | undefined) => {
      updateParams({
        [TRANSACTION_FILTER_KEYS.STATUS]: status ?? undefined,
        [TRANSACTION_FILTER_KEYS.PAGE]: undefined,
      });
    },
    [updateParams]
  );

  const setCurrency = useCallback(
    (currency: Currency | undefined) => {
      updateParams({
        [TRANSACTION_FILTER_KEYS.CURRENCY]: currency ?? undefined,
        [TRANSACTION_FILTER_KEYS.PAGE]: undefined,
      });
    },
    [updateParams]
  );

  const setPage = useCallback(
    (page: number) => {
      updateParams({ [TRANSACTION_FILTER_KEYS.PAGE]: page.toString() });
    },
    [updateParams]
  );

  const removeFilter = useCallback(
    (key: string) => {
      updateParams({
        [key]: undefined,
        [TRANSACTION_FILTER_KEYS.PAGE]: undefined,
      });
    },
    [updateParams]
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    filters,
    activeTab,
    searchQuery,
    activeFilters,
    hasActiveFilters,
    currentPage,
    setActiveTab,
    setSearchQuery,
    setStatus,
    setCurrency,
    setPage,
    removeFilter,
    resetFilters,
  };
}

export type { ActiveFilter, TabValue };
