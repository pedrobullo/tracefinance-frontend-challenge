"use client";

import type { ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "completed"
  | "pending"
  | "failed"
  | "outline";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-600",
  completed: "bg-green-50 text-status-completed",
  pending: "bg-amber-50 text-status-pending",
  failed: "bg-red-50 text-status-failed",
  outline: "bg-transparent border border-gray-300 text-gray-600",
};

export function Badge({
  children,
  variant = "default",
  removable,
  onRemove,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 hover:opacity-70"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
