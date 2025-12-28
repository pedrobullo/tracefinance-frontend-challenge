"use client";

import { tv } from "tailwind-variants";

const cellStyles = tv({
  base: "flex flex-1 items-center justify-center px-2.5 py-2 font-100-light transition-colors cursor-pointer",
  variants: {
    state: {
      default: "text-primary hover:bg-level-three",
      selected: "bg-brand-primary text-black",
      inRange: "bg-brand-primary-light text-primary",
    },
    position: {
      none: "",
      start: "rounded-l-lg",
      end: "rounded-r-lg",
      single: "rounded-lg",
    },
  },
  defaultVariants: {
    state: "default",
    position: "none",
  },
});

export interface MonthPickerCellProps {
  month: string;
  isSelected?: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  onClick?: () => void;
}

export function MonthPickerCell({
  month,
  isSelected = false,
  isInRange = false,
  isRangeStart = false,
  isRangeEnd = false,
  onClick,
}: MonthPickerCellProps) {
  const getState = () => {
    if (isSelected) return "selected";
    if (isInRange) return "inRange";
    return "default";
  };

  const getPosition = () => {
    if (isRangeStart && isRangeEnd) return "single";
    if (isRangeStart) return "start";
    if (isRangeEnd) return "end";
    if (isSelected && !isInRange) return "single";
    return "none";
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cellStyles({ state: getState(), position: getPosition() })}
    >
      {month}
    </button>
  );
}
