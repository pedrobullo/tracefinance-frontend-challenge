import { tv, type VariantProps } from "tailwind-variants";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const button = tv(
  {
    base: "inline-flex items-center justify-center text-100-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
    variants: {
      hierarchy: {
        primary: "bg-border-brand text-fixed-black hover:opacity-90",
        secondary:
          "bg-level-three text-primary hover:bg-level-one border border-border-primary",
        quiet: "bg-transparent text-primary hover:bg-level-three",
      },
      size: {
        small: "h-8 px-4 py-1 gap-1",
        medium: "h-10 px-6 py-2 gap-2",
        large: "h-12 px-8 py-3 gap-2",
      },
      radius: {
        square: "rounded-lg",
        rounded: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
      },
      iconOnly: {
        true: "aspect-square",
      },
    },
    compoundVariants: [{ iconOnly: true, className: "p-0" }],
    defaultVariants: {
      hierarchy: "primary",
      size: "medium",
      radius: "square",
    },
  },
  {
    twMerge: true,
  }
);

const iconSizes = {
  small: "h-4 w-4",
  medium: "h-5 w-5",
  large: "h-6 w-6",
};

export type ButtonHierarchy = VariantProps<typeof button>["hierarchy"];
export type ButtonSize = VariantProps<typeof button>["size"];
export type ButtonRadius = VariantProps<typeof button>["radius"];

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children?: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  hierarchy,
  size,
  radius,
  fullWidth,
  iconOnly,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={button({
        hierarchy,
        size,
        radius,
        fullWidth,
        iconOnly,
        className,
      })}
      {...props}
    >
      {leftIcon && (
        <span className={iconSizes[size || "medium"]}>{leftIcon}</span>
      )}
      {children}
      {rightIcon && (
        <span className={iconSizes[size || "medium"]}>{rightIcon}</span>
      )}
    </button>
  );
}
