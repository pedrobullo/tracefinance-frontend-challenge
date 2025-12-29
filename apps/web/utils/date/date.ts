import type { MonthRange } from "@repo/ui";

export type PeriodKey =
  | "thisMonth"
  | "lastMonth"
  | "last3Months"
  | "last6Months"
  | "thisYear"
  | "custom";

export const PERIOD_OPTIONS: PeriodKey[] = [
  "thisMonth",
  "lastMonth",
  "last3Months",
  "last6Months",
  "thisYear",
  "custom",
];

export const getPeriodRange = (period: PeriodKey): MonthRange => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  switch (period) {
    case "thisMonth":
      return {
        start: { month: currentMonth, year: currentYear },
        end: { month: currentMonth, year: currentYear },
      };
    case "lastMonth": {
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return {
        start: { month: lastMonth, year: lastMonthYear },
        end: { month: lastMonth, year: lastMonthYear },
      };
    }
    case "last3Months": {
      const startMonth = (currentMonth - 2 + 12) % 12;
      const startYear = currentMonth < 2 ? currentYear - 1 : currentYear;
      return {
        start: { month: startMonth, year: startYear },
        end: { month: currentMonth, year: currentYear },
      };
    }
    case "last6Months": {
      const startMonth = (currentMonth - 5 + 12) % 12;
      const startYear = currentMonth < 5 ? currentYear - 1 : currentYear;
      return {
        start: { month: startMonth, year: startYear },
        end: { month: currentMonth, year: currentYear },
      };
    }
    case "thisYear":
      return {
        start: { month: 0, year: currentYear },
        end: { month: currentMonth, year: currentYear },
      };
    default:
      return { start: null, end: null };
  }
};

export const formatMonthYear = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatDateRange = (
  startDate: string | undefined,
  endDate: string | undefined,
  locale: string = "pt-BR"
): string | null => {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startLabel = formatMonthYear(start, locale);
  const endLabel = formatMonthYear(end, locale);

  return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
};

export const getMonthLabels = (locale: string): string[] => {
  return Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: "short" }).format(
      new Date(2024, i, 1)
    )
  );
};

export const detectPeriodFromRange = (range?: MonthRange): string => {
  if (!range?.start || !range?.end) return "";

  for (const period of PERIOD_OPTIONS) {
    if (period === "custom") continue;
    const periodRange = getPeriodRange(period);
    if (
      periodRange.start?.month === range.start.month &&
      periodRange.start?.year === range.start.year &&
      periodRange.end?.month === range.end.month &&
      periodRange.end?.year === range.end.year
    ) {
      return period;
    }
  }

  return "custom";
};
