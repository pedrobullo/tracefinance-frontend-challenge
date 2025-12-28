"use client";

import {
  type HTMLAttributes,
  forwardRef,
  type ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { tv, type VariantProps } from "tailwind-variants";
import { Typography } from "./Typography";

const dropdown = tv({
  slots: {
    container: "relative w-full",
    trigger:
      "flex h-12 w-full items-center justify-between rounded-lg border bg-level-two px-4 py-2 cursor-pointer transition-colors hover:bg-level-one",
    chevron: "h-4 w-4 transition-transform duration-200",
    menu: "absolute z-50 mt-1 w-full py-2 bg-level-one border border-border-primary rounded-lg shadow-dropdown transition-all duration-200 origin-top",
  },
  variants: {
    isOpen: {
      true: {
        chevron: "rotate-180",
        menu: "opacity-100 scale-y-100",
      },
      false: {
        menu: "opacity-0 scale-y-0 pointer-events-none",
      },
    },
    error: {
      true: { trigger: "border-feedback-error-primary" },
      false: { trigger: "border-border-primary" },
    },
  },
  defaultVariants: {
    isOpen: false,
    error: false,
  },
});

const dropdownItem = tv({
  base: "w-full flex items-center gap-2 px-4 py-2 text-left font-75-light text-primary hover:bg-level-three disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer",
  variants: {
    selected: {
      true: "bg-brand-primary-light",
    },
  },
});

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  placeholder?: string;
  value?: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(
    {
      label,
      placeholder = "Select...",
      value,
      options,
      onChange,
      error,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const styles = dropdown({ isOpen, error: !!error });

    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption?.label || placeholder;
    const hasValue = !!selectedOption;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
    };

    const handleToggle = () => {
      if (!disabled) setIsOpen(!isOpen);
    };

    return (
      <div
        ref={dropdownRef}
        className={`${styles.container()} ${className}`}
        {...props}
      >
        {label && (
          <Typography
            variant="75-light"
            color="tertiary"
            className="mb-2 block"
          >
            {label}
          </Typography>
        )}

        <div className={styles.trigger()} onClick={handleToggle}>
          <Typography
            variant="75-light"
            color={hasValue ? "primary" : "disable-primary"}
          >
            {displayValue}
          </Typography>
          <ChevronDownIcon
            className={`${styles.chevron()} ${hasValue ? "text-primary" : "text-disable-primary"}`}
          />
        </div>

        {error && (
          <Typography
            variant="75-light"
            color="feedback-error-primary"
            className="mt-1"
          >
            {error}
          </Typography>
        )}

        <div ref={ref} className={styles.menu()}>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              selected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </div>
      </div>
    );
  }
);

export interface DropdownItemProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownItem> {
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  function DropdownItem(
    { children, icon, selected, disabled = false, className = "", ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={`${dropdownItem({ selected })} ${className}`}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

export const DropdownSeparator = () => (
  <div className="my-1 border-t border-border-primary" />
);
