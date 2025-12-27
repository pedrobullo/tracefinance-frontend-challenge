import { tv, type VariantProps } from "tailwind-variants";
import { XMarkIcon } from "@heroicons/react/20/solid";

const badge = tv(
  {
    slots: {
      base: "inline-flex items-center justify-center gap-1.5 px-2 py-0.5 rounded",
      text: "font-75-light text-center leading-[18px]",
      closeButton: "cursor-pointer hover:opacity-70 transition-opacity",
    },
    variants: {
      variant: {
        default: {
          base: "bg-level-three",
          text: "text-primary",
        },
        success: {
          base: "bg-feedback-success",
          text: "text-feedback-success-secondary",
        },
        warning: {
          base: "bg-feedback-warning",
          text: "text-feedback-warning-secondary",
        },
        error: {
          base: "bg-feedback-error",
          text: "text-feedback-error-secondary",
        },
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
  {
    twMerge: true,
  }
);

export type BadgeVariant = VariantProps<typeof badge>["variant"];

export interface BadgeProps extends VariantProps<typeof badge> {
  children: React.ReactNode;
  className?: string;
  onRemove?: () => void;
}

export function Badge({ children, variant, onRemove, className }: BadgeProps) {
  const styles = badge({ variant });

  return (
    <span className={`${styles.base()} ${className || ""}`}>
      <span className={styles.text()}>{children}</span>
      {onRemove && (
        <XMarkIcon
          className={`${styles.closeButton()} h-4 w-4`}
          onClick={onRemove}
        />
      )}
    </span>
  );
}
