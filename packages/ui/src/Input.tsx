import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";
import { tv } from "tailwind-variants";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const input = tv({
  slots: {
    wrapper: "",
    label: "block text-75-medium text-primary mb-1.5",
    inputWrapper: "relative flex items-center",
    input: [
      "flex-1 bg-transparent text-100-light text-primary placeholder:text-disable-primary",
      "focus:outline-none",
      "border-0",
    ],
    container: [
      "flex items-center rounded-lg border bg-level-two",
      "transition-colors",
    ],
    icon: "flex-shrink-0 text-primary",
    error: "mt-1 text-75-light text-feedback-error-primary",
    hint: "mt-1 text-75-light text-secondary",
  },
  variants: {
    size: {
      sm: {
        container: "h-10 px-3 gap-2",
        icon: "w-5 h-5",
      },
      md: {
        container: "h-14 px-4 gap-2",
        icon: "w-6 h-6",
      },
      lg: {
        container: "h-16 px-4 gap-2",
        icon: "w-6 h-6",
      },
    },
    hasError: {
      true: {
        container:
          "border-feedback-error-primary focus-within:ring-feedback-error-primary",
      },
      false: {
        container: "border-border-primary",
      },
    },
    fullWidth: {
      true: {
        wrapper: "w-full",
        container: "w-full",
      },
    },
  },
  defaultVariants: {
    size: "md",
    hasError: false,
    fullWidth: true,
  },
});

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    size = "md",
    fullWidth = true,
    className = "",
    id,
    ...props
  },
  ref
) {
  const styles = input({
    size,
    hasError: !!error,
    fullWidth,
  });

  return (
    <div className={styles.wrapper()}>
      {label && (
        <label htmlFor={id} className={styles.label()}>
          {label}
        </label>
      )}
      <div className={styles.container()}>
        {leftIcon && <span className={styles.icon()}>{leftIcon}</span>}
        <input
          ref={ref}
          id={id}
          className={`${styles.input()} ${className}`}
          {...props}
        />
        {rightIcon && <span className={styles.icon()}>{rightIcon}</span>}
      </div>
      {error && <p className={styles.error()}>{error}</p>}
      {hint && !error && <p className={styles.hint()}>{hint}</p>}
    </div>
  );
});

Input.displayName = "Input";
