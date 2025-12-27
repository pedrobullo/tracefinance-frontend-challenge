import { tv, type VariantProps } from "tailwind-variants";
import type { ReactNode, ElementType } from "react";

const typography = tv(
  {
    variants: {
      variant: {
        "75-light": "font-75-light",
        "100-light": "font-100-light",
        "100-medium": "font-100-medium",
        "200-medium": "font-200-medium",
        "400-medium": "font-400-medium",
      },
      color: {
        primary: "text-primary",
        tertiary: "text-tertiary",
        "fixed-primary": "text-fixed-primary",
        "fixed-black": "text-fixed-black",
        "disable-primary": "text-disable-primary",
        "feedback-error-primary": "text-feedback-error-primary",
        "feedback-error-secondary": "text-feedback-error-secondary",
        "feedback-success-secondary": "text-feedback-success-secondary",
        "feedback-warning-secondary": "text-feedback-warning-secondary",
      },
    },
    defaultVariants: {
      variant: "200-medium",
      color: "primary",
    },
  },
  {
    twMerge: true,
  }
);

export type TypographyVariant = VariantProps<typeof typography>["variant"];
export type TypographyColor = VariantProps<typeof typography>["color"];

export interface TypographyProps extends VariantProps<typeof typography> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Typography({
  variant,
  color,
  as: Component = "span",
  children,
  className,
}: TypographyProps) {
  return (
    <Component className={typography({ variant, color, className })}>
      {children}
    </Component>
  );
}
