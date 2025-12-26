"use client";

import { useCallback, useRef, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  TableRowSkeleton,
  EmptyState,
} from "@repo/ui";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "@/contexts/LanguageContext";
import type { Transaction } from "@repo/types/transaction";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isEmpty: boolean;
  isError: boolean;
  onRetry: () => void;
}

/**
 * Formata valor em centavos para moeda BRL
 */
function formatCurrency(amount: number, currency = "BRL"): string {
  const value = amount / 100;
  const isNegative = value < 0;

  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(Math.abs(value));

  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Formata data ISO para exibição
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const hours = date.getHours();
  const period = hours >= 12 ? "pm" : "am";
  const displayHour = hours % 12 || 12;

  return `${day} ${month} -${displayHour}${period}`;
}

/**
 * Mapeia status para variante do Badge
 */
function getStatusVariant(status: string): "completed" | "pending" | "failed" {
  switch (status) {
    case "COMPLETED":
      return "completed";
    case "PENDING":
      return "pending";
    case "FAILED":
      return "failed";
    default:
      return "pending";
  }
}

export function TransactionTable({
  transactions,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  isEmpty,
  isError,
  onRetry,
}: TransactionTableProps) {
  const { t } = useTranslation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll com Intersection Observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Estado de erro
  if (isError) {
    return (
      <EmptyState
        icon={<XCircleIcon className="w-12 h-12" />}
        title={t.transactions.errorTitle}
        description={t.transactions.errorDescription}
        action={
          <button
            onClick={onRetry}
            className="text-primary hover:text-primary-hover font-medium"
          >
            {t.transactions.retry}
          </button>
        }
      />
    );
  }

  // Estado vazio
  if (isEmpty) {
    return (
      <EmptyState
        icon={<XCircleIcon className="w-12 h-12" />}
        title={t.transactions.emptyTitle}
        description={t.transactions.emptyDescription}
      />
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow hoverable={false}>
            <TableHead>{t.transactions.id}</TableHead>
            <TableHead>{t.transactions.description}</TableHead>
            <TableHead>{t.transactions.method}</TableHead>
            <TableHead>{t.transactions.date}</TableHead>
            <TableHead>{t.transactions.status}</TableHead>
            <TableHead className="text-right">
              {t.transactions.amount}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Loading inicial */}
          {isLoading && transactions.length === 0 && (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRowSkeleton key={i} columns={6} />
              ))}
            </>
          )}

          {/* Dados */}
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{transaction.description || "-"}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(transaction.status)}>
                  {
                    t.status[
                      transaction.status.toLowerCase() as keyof typeof t.status
                    ]
                  }
                </Badge>
              </TableCell>
              <TableCell
                className={`text-right font-medium ${transaction.amount < 0 ? "text-status-failed" : ""}`}
              >
                {formatCurrency(transaction.amount, transaction.currency)}
              </TableCell>
            </TableRow>
          ))}

          {/* Loading de mais itens */}
          {isFetchingNextPage && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRowSkeleton key={`loading-${i}`} columns={6} />
              ))}
            </>
          )}
        </TableBody>
      </Table>

      {/* Trigger para infinite scroll */}
      <div ref={loadMoreRef} className="h-4" />
    </>
  );
}
