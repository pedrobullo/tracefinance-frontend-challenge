"use client";

import { ChevronRightIcon } from "@heroicons/react/20/solid";

export interface FilterPanelItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function FilterPanelItem({
  icon,
  label,
  isActive = false,
  onClick,
}: FilterPanelItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center justify-between rounded-lg px-4 py-3 gap-2
        transition-colors
        ${isActive ? "bg-level-three" : "hover:bg-level-three/50"}
      `}
    >
      <div className="flex items-center gap-1">
        <span className="h-4 w-4 text-tertiary">{icon}</span>
        <span className="font-100-light text-primary">{label}</span>
      </div>
      <ChevronRightIcon className="h-4 w-4 text-tertiary" />
    </button>
  );
}
