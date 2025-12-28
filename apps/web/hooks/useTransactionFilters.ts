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
import type { MonthRange } from "@repo/ui";
import { formatDateRange } from "@/utils/date";

type TabValue = "ALL" | TransactionType;

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

interface FilterUpdates {
  type?: TabValue;
  status?: TransactionStatus;
  search?: string;
  dateRange?: MonthRange;
  page?: number;
}

interface UseTransactionFilters {
  filters: TransactionFilters;
  activeTab: TabValue;
  searchQuery: string;
  activeFilters: ActiveFilter[];
  hasActiveFilters: boolean;
  currentPage: number;
  dateRange: MonthRange;
  setFilters: (updates: FilterUpdates) => void;
  removeFilter: (key: string) => void;
  resetFilters: () => void;
}

export function useTransactionFilters(): UseTransactionFilters {
  const { t, language } = useTranslation();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo<TabValue>(() => {
    const type = searchParams.get(TRANSACTION_FILTER_KEYS.TYPE);
    if (type === TRANSACTION_TYPE.PIX || type === TRANSACTION_TYPE.TED)
      return type;
    return "ALL";
  }, [searchParams]);

  const currentPage = parseInt(
    searchParams.get(TRANSACTION_FILTER_KEYS.PAGE) ?? "1",
    10
  );

  const filters = useMemo<TransactionFilters>(
    () => ({
      page: currentPage,
      limit: 20,
      status:
        (searchParams.get(
          TRANSACTION_FILTER_KEYS.STATUS
        ) as TransactionStatus) || undefined,
      currency: searchParams.get(TRANSACTION_FILTER_KEYS.CURRENCY) as Currency,
      search: searchParams.get(TRANSACTION_FILTER_KEYS.SEARCH) || undefined,
      startDate:
        searchParams.get(TRANSACTION_FILTER_KEYS.START_DATE) || undefined,
      endDate: searchParams.get(TRANSACTION_FILTER_KEYS.END_DATE) || undefined,
    }),
    [searchParams, currentPage]
  );

  const searchQuery = filters.search || "";

  const dateRange = useMemo<MonthRange>(() => {
    if (!filters.startDate || !filters.endDate)
      return { start: null, end: null };
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    return {
      start: { month: start.getMonth(), year: start.getFullYear() },
      end: { month: end.getMonth(), year: end.getFullYear() },
    };
  }, [filters.startDate, filters.endDate]);

  const activeFilters = useMemo<ActiveFilter[]>(() => {
    const result: ActiveFilter[] = [];

    if (activeTab !== "ALL") {
      result.push({
        key: TRANSACTION_FILTER_KEYS.TYPE,
        label: t("filters.type"),
        value: activeTab,
      });
    }

    if (filters.status) {
      result.push({
        key: TRANSACTION_FILTER_KEYS.STATUS,
        label: t("filters.status"),
        value: t(`status.${filters.status}`),
      });
    }

    if (filters.currency) {
      result.push({
        key: TRANSACTION_FILTER_KEYS.CURRENCY,
        label: t("filters.currency"),
        value: filters.currency,
      });
    }

    if (filters.search) {
      result.push({
        key: TRANSACTION_FILTER_KEYS.SEARCH,
        label: t("filters.search"),
        value: `"${filters.search}"`,
      });
    }

    const dateLabel = formatDateRange(
      filters.startDate,
      filters.endDate,
      language
    );
    if (dateLabel) {
      result.push({
        key: "dateRange",
        label: t("filterMenu.date"),
        value: dateLabel,
      });
    }
    return result;
  }, [filters, t, language, activeTab]);

  const hasActiveFilters = activeFilters.length > 0 || activeTab !== "ALL";

  const setFilters = useCallback(
    (updates: FilterUpdates) => {
      const params = new URLSearchParams(searchParams.toString());

      if ("type" in updates) {
        const type = updates.type === "ALL" ? undefined : updates.type;
        if (type) {
          params.set(TRANSACTION_FILTER_KEYS.TYPE, type);
        } else {
          params.delete(TRANSACTION_FILTER_KEYS.TYPE);
        }
      }

      if ("status" in updates) {
        if (updates.status) {
          params.set(TRANSACTION_FILTER_KEYS.STATUS, updates.status);
        } else {
          params.delete(TRANSACTION_FILTER_KEYS.STATUS);
        }
      }

      if ("search" in updates) {
        if (updates.search) {
          params.set(TRANSACTION_FILTER_KEYS.SEARCH, updates.search);
        } else {
          params.delete(TRANSACTION_FILTER_KEYS.SEARCH);
        }
      }

      if ("dateRange" in updates) {
        const range = updates.dateRange;
        if (range?.start && range?.end) {
          const startDate = new Date(range.start.year, range.start.month, 1);
          const endDate = new Date(range.end.year, range.end.month + 1, 0);
          params.set(
            TRANSACTION_FILTER_KEYS.START_DATE,
            startDate.toISOString()
          );
          params.set(TRANSACTION_FILTER_KEYS.END_DATE, endDate.toISOString());
        } else {
          params.delete(TRANSACTION_FILTER_KEYS.START_DATE);
          params.delete(TRANSACTION_FILTER_KEYS.END_DATE);
        }
      }

      if ("page" in updates) {
        if (updates.page) {
          params.set(TRANSACTION_FILTER_KEYS.PAGE, updates.page.toString());
        } else {
          params.delete(TRANSACTION_FILTER_KEYS.PAGE);
        }
      } else {
        params.delete(TRANSACTION_FILTER_KEYS.PAGE);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const removeFilter = useCallback(
    (key: string) => {
      if (key === "dateRange") {
        setFilters({ dateRange: { start: null, end: null } });
        return;
      }
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      params.delete(TRANSACTION_FILTER_KEYS.PAGE);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [setFilters, searchParams, router, pathname]
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
    dateRange,
    setFilters,
    removeFilter,
    resetFilters,
  };
}

export type { ActiveFilter, TabValue, FilterUpdates };
