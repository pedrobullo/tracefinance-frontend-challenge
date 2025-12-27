"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "@/contexts/LanguageContext";

interface NavItemProps {
  icon: React.ReactNode;
  translationKey: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavItem({
  icon,
  translationKey,
  isActive = false,
  onClick,
}: NavItemProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        box-border flex w-72 items-center justify-between rounded-lg px-8 py-6
        ${
          isActive
            ? "border-l-[5px] border-l-border-brand bg-fixed-level-two"
            : "hover:bg-fixed-level-two/50"
        }
      `}
    >
      <div className="flex items-center gap-2">
        <span className={isActive ? "text-border-brand" : "text-fixed-primary"}>
          {icon}
        </span>
        <span className="text-200-medium text-fixed-primary">
          {t(translationKey)}
        </span>
      </div>
      <ChevronRightIcon className="h-5 w-5 text-fixed-primary" />
    </button>
  );
}
