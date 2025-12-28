import { tv, type VariantProps } from "tailwind-variants";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const button = tv(
  {
    slots: {
      base: "inline-flex items-center justify-center font-100-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
      icon: "",
    },
    variants: {
      hierarchy: {
        primary: {
          base: "bg-border-brand text-black hover:opacity-90",
        },
        secondary: {
          base: "bg-level-three text-primary hover:bg-level-one border border-border-primary",
        },
        quiet: {
          base: "bg-transparent text-primary hover:bg-level-three",
        },
      },
      size: {
        small: {
          base: "h-8 px-4 py-1 gap-1",
          icon: "h-4 w-4",
        },
        medium: {
          base: "h-10 px-6 py-2 gap-2",
          icon: "h-5 w-5",
        },
        large: {
          base: "h-12 px-8 py-3 gap-2",
          icon: "h-6 w-6",
        },
      },
      radius: {
        square: {
          base: "rounded-lg",
        },
        rounded: {
          base: "rounded-full",
        },
      },
      fullWidth: {
        true: {
          base: "w-full",
        },
      },
      iconOnly: {
        true: {
          base: "aspect-square",
        },
      },
    },
    compoundVariants: [{ iconOnly: true, base: "p-0" }],
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
  const styles = button({ hierarchy, size, radius, fullWidth, iconOnly });

  return (
    <button
      disabled={disabled || isLoading}
      className={`${styles.base()} ${className || ""}`}
      {...props}
    >
      {leftIcon && <span className={styles.icon()}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={styles.icon()}>{rightIcon}</span>}
    </button>
  );
}
