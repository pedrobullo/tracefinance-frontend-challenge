import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";

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

const sizeStyles = {
  sm: "h-8 text-sm px-3",
  md: "h-10 text-sm px-4",
  lg: "h-12 text-base px-4",
};

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
  const baseStyles =
    "rounded-lg border bg-white dark:bg-dark-card text-text-primary dark:text-text-inverse placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors";
  const errorStyles = error
    ? "border-status-failed focus:ring-status-failed"
    : "border-light-border dark:border-dark-border";
  const iconPaddingLeft = leftIcon ? "pl-10" : "";
  const iconPaddingRight = rightIcon ? "pr-10" : "";

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-primary dark:text-text-inverse mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          className={`${baseStyles} ${errorStyles} ${sizeStyles[size]} ${iconPaddingLeft} ${iconPaddingRight} ${fullWidth ? "w-full" : ""} ${className}`}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-status-failed">{error}</p>}
      {hint && !error && <p className="mt-1 text-sm text-text-muted">{hint}</p>}
    </div>
  );
});

Input.displayName = "Input";
