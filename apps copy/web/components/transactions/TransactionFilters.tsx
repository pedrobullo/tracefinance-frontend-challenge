"use client";

import { useState } from "react";
import {
  CalendarIcon,
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Button, Badge, Dropdown, DropdownItem } from "@repo/ui";
import { useTranslation } from "@/contexts/LanguageContext";
import { TRANSACTION_TYPE } from "@repo/types/constants";
import type { TransactionFilters as Filters } from "@repo/types/transaction";

interface TransactionFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onApply: () => void;
  onClear: () => void;
}

const MONTHS = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Feb" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Apr" },
  { value: "05", label: "May" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Aug" },
  { value: "09", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

export function TransactionFilters({
  filters,
  onFiltersChange,
  onApply,
  onClear,
}: TransactionFiltersProps) {
  const { t } = useTranslation();
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isMethodOpen, setIsMethodOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const hasActiveFilters = filters.startDate || filters.endDate || filters.type;

  const handleMonthToggle = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const handleApplyDateFilter = () => {
    if (selectedMonths.length > 0) {
      const sortedMonths = [...selectedMonths].sort();
      const startMonth = sortedMonths[0];
      const endMonth = sortedMonths[sortedMonths.length - 1];

      onFiltersChange({
        ...filters,
        startDate: `${selectedYear}-${startMonth}-01`,
        endDate: `${selectedYear}-${endMonth}-31`,
      });
    }
    setIsDateOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Add Filter Button */}
      <Dropdown
        trigger={
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<FunnelIcon className="w-4 h-4" />}
          >
            {t.transactions.addFilter}
          </Button>
        }
        closeOnSelect={false}
      >
        {/* Date Filter */}
        <div className="p-2">
          <button
            onClick={() => {
              setIsDateOpen(!isDateOpen);
              setIsMethodOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-card rounded-lg"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-text-muted" />
              <span>{t.filters.date}</span>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 text-text-muted transition-transform ${isDateOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDateOpen && (
            <div className="mt-2 p-3 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg">
              <p className="text-xs text-text-muted mb-2">
                {t.filters.viewTransactionsOf}
              </p>

              {/* Period selector */}
              <select className="w-full p-2 mb-3 border border-light-border dark:border-dark-border rounded-lg text-sm bg-white dark:bg-dark-bg">
                <option value="">{t.filters.selectPeriod}</option>
                <option value="custom">Custom</option>
              </select>

              {/* Date inputs */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder={t.filters.from}
                  className="flex-1 p-2 border border-light-border dark:border-dark-border rounded-lg text-sm"
                />
                <span className="self-center text-text-muted">-</span>
                <input
                  type="text"
                  placeholder={t.filters.to}
                  className="flex-1 p-2 border border-light-border dark:border-dark-border rounded-lg text-sm"
                />
              </div>

              {/* Year navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setSelectedYear((y) => y - 1)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-dark-border rounded"
                >
                  ‹
                </button>
                <span className="text-sm font-medium">{selectedYear}</span>
                <button
                  onClick={() => setSelectedYear((y) => y + 1)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-dark-border rounded"
                >
                  ›
                </button>
              </div>

              {/* Month grid */}
              <div className="grid grid-cols-4 gap-2">
                {MONTHS.map((month) => (
                  <button
                    key={month.value}
                    onClick={() => handleMonthToggle(month.value)}
                    className={`
                      p-2 text-xs rounded-full transition-colors
                      ${
                        selectedMonths.includes(month.value)
                          ? "bg-primary text-dark-bg font-medium"
                          : "hover:bg-gray-100 dark:hover:bg-dark-border"
                      }
                    `}
                  >
                    {month.label}
                  </button>
                ))}
              </div>

              <Button
                size="sm"
                className="w-full mt-3"
                onClick={handleApplyDateFilter}
              >
                {t.filters.apply}
              </Button>
            </div>
          )}
        </div>

        {/* Method Filter */}
        <div className="p-2 pt-0">
          <button
            onClick={() => {
              setIsMethodOpen(!isMethodOpen);
              setIsDateOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-dark-card rounded-lg"
          >
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-4 h-4 text-text-muted" />
              <span>{t.filters.method}</span>
            </div>
            <ChevronDownIcon
              className={`w-4 h-4 text-text-muted transition-transform ${isMethodOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isMethodOpen && (
            <div className="mt-2 p-2 space-y-1">
              <DropdownItem
                onClick={() => onFiltersChange({ ...filters, type: "PIX" })}
              >
                PIX
              </DropdownItem>
              <DropdownItem
                onClick={() => onFiltersChange({ ...filters, type: "TED" })}
              >
                TED
              </DropdownItem>
            </div>
          )}
        </div>
      </Dropdown>

      {/* Active filters display */}
      {hasActiveFilters ? (
        <div className="flex items-center gap-2">
          {filters.type && (
            <Badge
              variant="outline"
              removable
              onRemove={() => onFiltersChange({ ...filters, type: undefined })}
            >
              {filters.type}
            </Badge>
          )}
          {(filters.startDate || filters.endDate) && (
            <Badge
              variant="outline"
              removable
              onRemove={() =>
                onFiltersChange({
                  ...filters,
                  startDate: undefined,
                  endDate: undefined,
                })
              }
            >
              {filters.startDate} - {filters.endDate}
            </Badge>
          )}
          <button
            onClick={onClear}
            className="text-sm text-text-muted hover:text-text-primary dark:hover:text-text-inverse transition-colors"
          >
            {t.filters.clear}
          </button>
        </div>
      ) : (
        <span className="text-sm text-text-muted">
          {t.transactions.noFilterApplied}
        </span>
      )}
    </div>
  );
}
