import {
  type HTMLAttributes,
  forwardRef,
  type ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  closeOnSelect?: boolean;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(
    {
      trigger,
      children,
      align = "left",
      closeOnSelect = true,
      className = "",
      ...props
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    return (
      <div
        ref={dropdownRef}
        className={`relative inline-block ${className}`}
        {...props}
      >
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

        {isOpen && (
          <div
            ref={ref}
            className={`
              absolute z-50 mt-2 min-w-[200px] py-2
              bg-white dark:bg-dark-card
              border border-light-border dark:border-dark-border
              rounded-lg shadow-dropdown
              animate-fade-in
              ${align === "right" ? "right-0" : "left-0"}
            `}
            onClick={() => closeOnSelect && setIsOpen(false)}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

// Dropdown Item
export interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  function DropdownItem(
    { children, icon, disabled = false, className = "", ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={`
          w-full flex items-center gap-2 px-4 py-2 text-sm text-left
          text-text-primary dark:text-text-inverse
          hover:bg-gray-50 dark:hover:bg-dark-border
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${className}
        `}
        {...props}
      >
        {icon && <span className="shrink-0 text-text-muted">{icon}</span>}
        {children}
      </button>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

// Dropdown Separator
export const DropdownSeparator = () => (
  <div className="my-1 border-t border-light-border dark:border-dark-border" />
);
