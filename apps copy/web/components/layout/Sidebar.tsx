"use client";

import {
  ArrowsRightLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  MoonIcon,
  SunIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/contexts/LanguageContext";
// import { Dropdown, DropdownItem } from "@repo/ui";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useTranslation();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex flex-col w-60 
        bg-(--bg-sidebar) text-(--text-primary)
        ${className}
      `}
    >
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="text-primary text-2xl font-bold leading-none">
            <span>:</span>
            <span>*</span>
          </div>
          <span className="text-lg font-semibold">trace finance</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <div
          className="
            flex items-center justify-between px-3 py-2.5 rounded-lg
            bg-(--bg-card) border-l-2 border-primary
            cursor-pointer transition-colors
          "
        >
          <div className="flex items-center gap-3">
            <ArrowsRightLeftIcon className="w-5 h-5 text-(--text-primary)" />
            <span className="text-sm font-medium">
              {t("pages.transactions")}
            </span>
          </div>
          <ChevronRightIcon className="w-4 h-4 text-(--text-muted)" />
        </div>
      </nav>

      {/* Theme & Language Controls */}
      <div className="px-3 py-2 border-t border-(--border-default)">
        <div className="flex items-center justify-between px-3 py-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-hover) transition-colors"
          >
            {theme === "dark" ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setLanguage("pt-BR")}
            className={`px-3 py-1 rounded text-(--text-primary) cursor-pointer transition-colors ${language === "pt-BR" ? "bg-primary/20" : "hover:bg-(--bg-hover)"}`}
          >
            {t("language.pt-BR")}
          </button>
          <button
            onClick={() => setLanguage("en-US")}
            className={`px-3 py-1 rounded text-(--text-primary) cursor-pointer transition-colors ${language === "en-US" ? "bg-primary/20" : "hover:bg-(--bg-hover)"}`}
          >
            {t("language.en-US")}
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-(--border-default)">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-(--bg-hover) transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
            EM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-(--text-primary)">
              Evandro
            </p>
            <p className="text-xs text-(--text-muted) truncate">
              {t("sidebar.userRole")}
            </p>
          </div>
          <ChevronUpIcon className="w-4 h-4 text-(--text-muted)" />
        </div>
      </div>
    </aside>
  );
}
