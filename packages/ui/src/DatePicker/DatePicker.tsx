"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MonthPicker, type MonthRange, type MonthYear } from "./MonthPicker";
import { Typography } from "../Typography";

export interface DatePickerProps {
  value?: MonthRange;
  onChange?: (range: MonthRange) => void;
  monthLabels?: string[];
  fromLabel?: string;
  toLabel?: string;
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

const EMPTY_RANGE: MonthRange = { start: null, end: null };

const areRangesEqual = (a?: MonthRange, b?: MonthRange): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  const startEqual =
    a.start?.month === b.start?.month && a.start?.year === b.start?.year;
  const endEqual = a.end?.month === b.end?.month && a.end?.year === b.end?.year;
  return startEqual && endEqual;
};

export function DatePicker({
  value,
  onChange,
  monthLabels = DEFAULT_MONTH_LABELS,
  fromLabel = "From",
  toLabel = "To",
}: DatePickerProps) {
  const [internalRange, setInternalRange] = useState<MonthRange>(
    value ?? EMPTY_RANGE
  );
  const [selectingStart, setSelectingStart] = useState(true);
  const prevValueRef = useRef<MonthRange | undefined>(value);

  useEffect(() => {
    if (!areRangesEqual(value, prevValueRef.current)) {
      setInternalRange(value ?? EMPTY_RANGE);
      setSelectingStart(true);
      prevValueRef.current = value;
    }
  }, [value]);

  const handleMonthSelect = useCallback(
    (selected: MonthYear) => {
      if (selectingStart) {
        setInternalRange({ start: selected, end: null });
        setSelectingStart(false);
      } else {
        const startDate = internalRange.start;
        if (!startDate) {
          setInternalRange({ start: selected, end: null });
          setSelectingStart(false);
          return;
        }

        const startTime = new Date(startDate.year, startDate.month).getTime();
        const selectedTime = new Date(selected.year, selected.month).getTime();

        let finalRange: MonthRange;
        if (selectedTime < startTime) {
          finalRange = { start: selected, end: startDate };
        } else {
          finalRange = { start: startDate, end: selected };
        }

        setInternalRange(finalRange);
        setSelectingStart(true);
        onChange?.(finalRange);
      }
    },
    [selectingStart, internalRange.start, onChange]
  );

  const formatMonthYear = (date: MonthYear | null): string | null => {
    if (!date) return null;
    return `${monthLabels[date.month]} ${date.year}`;
  };

  const startLabel = formatMonthYear(internalRange.start);
  const endLabel = formatMonthYear(internalRange.end);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full gap-1">
        <div className="flex h-12 flex-1 items-center rounded-lg border border-border-primary bg-level-two px-4 py-2">
          <Typography
            variant="75-light"
            color={startLabel ? "primary" : "disable-primary"}
          >
            {startLabel || fromLabel}
          </Typography>
        </div>

        <Typography
          variant="75-light"
          color="tertiary"
          className="flex items-center"
        >
          -
        </Typography>

        <div className="flex h-12 flex-1 items-center rounded-lg border border-border-primary bg-level-two px-4 py-2">
          <Typography
            variant="75-light"
            color={endLabel ? "primary" : "disable-primary"}
          >
            {endLabel || toLabel}
          </Typography>
        </div>
      </div>

      <MonthPicker
        value={internalRange}
        onMonthSelect={handleMonthSelect}
        monthLabels={monthLabels}
      />
    </div>
  );
}
