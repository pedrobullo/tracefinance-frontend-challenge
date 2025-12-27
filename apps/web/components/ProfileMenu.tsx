"use client";

import {
  SunIcon,
  MoonIcon,
  LanguageIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Typography, Button } from "@repo/ui";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useTranslation();

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLang: Locale) => {
    setLanguage(newLang);
  };

  return (
    <div
      className={`
        absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-lg
        bg-fixed-level-two shadow-lg transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div className="relative p-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 rounded-lg p-1 text-tertiary transition-colors hover:bg-fixed-level-three hover:text-fixed-primary"
          aria-label="Close menu"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <SunIcon className="h-4 w-4 text-tertiary" />
            <Typography variant="100-medium" color="tertiary">
              {t("theme.label")}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleThemeChange("light")}
              hierarchy={theme === "light" ? "primary" : "secondary"}
              size="small"
              fullWidth
              leftIcon={<SunIcon />}
            >
              {t("theme.light")}
            </Button>
            <Button
              onClick={() => handleThemeChange("dark")}
              hierarchy={theme === "dark" ? "primary" : "secondary"}
              size="small"
              fullWidth
              leftIcon={<MoonIcon />}
            >
              {t("theme.dark")}
            </Button>
          </div>
        </div>

        <div className="border-t border-border-primary pt-4">
          <div className="mb-2 flex items-center gap-2">
            <LanguageIcon className="h-4 w-4 text-tertiary" />
            <Typography variant="100-medium" color="tertiary">
              {t("language.label")}
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleLanguageChange("en-US")}
              hierarchy={language === "en-US" ? "primary" : "secondary"}
              size="small"
              fullWidth
            >
              EN
            </Button>
            <Button
              onClick={() => handleLanguageChange("pt-BR")}
              hierarchy={language === "pt-BR" ? "primary" : "secondary"}
              size="small"
              fullWidth
            >
              PT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
