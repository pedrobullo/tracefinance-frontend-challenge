import { type InputHTMLAttributes, forwardRef } from "react";

export interface RadioCardProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

/**
 * RadioCard - Componente de seleção estilo card (usado no formulário de método PIX/TED)
 */
export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  ({ label, description, className = "", checked, ...props }, ref) => {
    return (
      <label
        className={`
          flex items-center gap-4 p-4 cursor-pointer
          border rounded-lg transition-all
          ${
            checked
              ? "border-primary bg-primary-light dark:bg-primary/10"
              : "border-light-border dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600"
          }
          ${className}
        `}
      >
        <input
          ref={ref}
          type="radio"
          checked={checked}
          className="sr-only"
          {...props}
        />

        {/* Custom radio indicator */}
        <div
          className={`
            shrink-0 w-5 h-5 rounded-full border-2 transition-colors
            flex items-center justify-center
            ${
              checked
                ? "border-primary"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
        >
          {checked && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
        </div>

        <div className="flex-1">
          <span className="text-sm font-medium text-text-primary dark:text-text-inverse">
            {label}
          </span>
          {description && (
            <p className="text-xs text-text-muted mt-0.5">{description}</p>
          )}
        </div>
      </label>
    );
  }
);

RadioCard.displayName = "RadioCard";
