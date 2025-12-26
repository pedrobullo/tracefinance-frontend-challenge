import type { ReactNode, ElementType } from "react";

export type TypographyVariant =
  | "75-light"
  | "100-light"
  | "200-medium"
  | "400-medium";

export interface TypographyProps {
  variant?: TypographyVariant;
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  "75-light": "font-75-light",
  "100-light": "font-100-light",
  "200-medium": "font-200-medium",
  "400-medium": "font-400-medium",
};

export function Typography({
  variant = "200-medium",
  as: Component = "span",
  children,
  className = "",
}: TypographyProps) {
  return (
    <Component className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
}
