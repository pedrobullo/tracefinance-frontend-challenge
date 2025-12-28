"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { MonthPickerCell } from "./MonthPickerCell";
import { Button } from "../Button";
import { Typography } from "../Typography";

export interface MonthYear {
  month: number;
  year: number;
}

export interface MonthRange {
  start: MonthYear | null;
  end: MonthYear | null;
}

export interface MonthPickerProps {
  value?: MonthRange;
  onMonthSelect?: (selected: MonthYear) => void;
  monthLabels?: string[];
}

const DEFAULT_MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_PER_ROW = 4;
const TOTAL_ROWS = 3;

export function MonthPicker({
  value,
  onMonthSelect,
  monthLabels = DEFAULT_MONTH_LABELS,
}: MonthPickerProps) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleMonthClick = (monthIndex: number) => {
    onMonthSelect?.({ month: monthIndex, year: currentYear });
  };

  const isMonthSelected = (monthIndex: number): boolean => {
    if (!value?.start) return false;
    const isStart =
      value.start.month === monthIndex && value.start.year === currentYear;
    const isEnd =
      value.end?.month === monthIndex && value.end?.year === currentYear;
    return isStart || isEnd;
  };

  const isMonthInRange = (monthIndex: number): boolean => {
    if (!value?.start || !value?.end) return false;

    const current = new Date(currentYear, monthIndex);
    const start = new Date(value.start.year, value.start.month);
    const end = new Date(value.end.year, value.end.month);

    return current >= start && current <= end;
  };

  const isRangeStart = (monthIndex: number): boolean => {
    if (!value?.start) return false;
    return value.start.month === monthIndex && value.start.year === currentYear;
  };

  const isRangeEnd = (monthIndex: number): boolean => {
    if (!value?.end) return false;
    return value.end.month === monthIndex && value.end.year === currentYear;
  };

  const renderMonthRow = (rowIndex: number) => {
    const startMonth = rowIndex * MONTHS_PER_ROW;
    const endMonth = startMonth + MONTHS_PER_ROW;

    return (
      <div key={rowIndex} className="flex w-full">
        {monthLabels.slice(startMonth, endMonth).map((month, index) => {
          const monthIndex = startMonth + index;
          return (
            <MonthPickerCell
              key={monthIndex}
              month={month}
              isSelected={isMonthSelected(monthIndex)}
              isInRange={isMonthInRange(monthIndex)}
              isRangeStart={isRangeStart(monthIndex)}
              isRangeEnd={isRangeEnd(monthIndex)}
              onClick={() => handleMonthClick(monthIndex)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          hierarchy="quiet"
          size="small"
          iconOnly
          onClick={() => setCurrentYear((y) => y - 1)}
        >
          <ChevronLeftIcon className="h-3 w-3" />
        </Button>

        <Typography variant="75-light" color="primary">
          {currentYear}
        </Typography>

        <Button
          type="button"
          hierarchy="quiet"
          size="small"
          iconOnly
          onClick={() => setCurrentYear((y) => y + 1)}
        >
          <ChevronRightIcon className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {Array.from({ length: TOTAL_ROWS }).map((_, index) =>
          renderMonthRow(index)
        )}
      </div>
    </div>
  );
}
