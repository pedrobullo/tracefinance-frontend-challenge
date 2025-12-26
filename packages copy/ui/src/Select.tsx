import { type SelectHTMLAttributes, forwardRef } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: "h-8 text-sm px-3",
  md: "h-10 text-sm px-4",
  lg: "h-12 text-base px-4",
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      size = "md",
      fullWidth = true,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "rounded-lg border bg-white dark:bg-dark-card text-text-primary dark:text-text-inverse focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors appearance-none cursor-pointer pr-10";
    const errorStyles = error
      ? "border-status-failed focus:ring-status-failed"
      : "border-light-border dark:border-dark-border";

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
          <select
            ref={ref}
            id={id}
            className={`${baseStyles} ${errorStyles} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        {error && <p className="mt-1 text-sm text-status-failed">{error}</p>}
        {hint && !error && (
          <p className="mt-1 text-sm text-text-muted">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
