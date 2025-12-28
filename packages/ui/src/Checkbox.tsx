"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const checkbox = tv({
  slots: {
    container: "flex items-center gap-3 cursor-pointer",
    input:
      "h-5 w-5 rounded border-2 border-border-primary bg-transparent appearance-none cursor-pointer transition-colors checked:bg-brand-primary checked:border-brand-primary",
    label: "font-100-light text-primary select-none",
  },
});

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
    VariantProps<typeof checkbox> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, className = "", ...props }, ref) {
    const styles = checkbox();

    return (
      <label className={`${styles.container()} ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.input()}
          {...props}
        />
        {label && <span className={styles.label()}>{label}</span>}
      </label>
    );
  }
);
