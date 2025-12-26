import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
  className?: string;
}

const paddingStyles = { none: "", sm: "p-3", md: "p-4", lg: "p-6" };

export function Card({
  children,
  padding = "md",
  bordered = true,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-dark-card rounded-lg
        ${bordered ? "border border-light-border dark:border-dark-border" : ""}
        ${paddingStyles[padding]} ${className}
      `}
    >
      {children}
    </div>
  );
}
