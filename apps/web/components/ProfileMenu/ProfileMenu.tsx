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
        absolute bottom-full left-0 mb-3 w-full overflow-hidden rounded-xl
        border border-fixed-level-three bg-fixed-level-two
        shadow-xl transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div className="px-5 py-4">
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            hierarchy="quiet"
            size="small"
            iconOnly
            aria-label="Close menu"
          >
            <XMarkIcon className="h-5 w-5 text-fixed-tertiary" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <SunIcon className="h-4 w-4 text-fixed-tertiary" />
            <Typography variant="100-medium" color="fixed-tertiary">
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

        <div className="my-4 border-t border-fixed-level-three" />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <LanguageIcon className="h-4 w-4 text-fixed-tertiary" />
            <Typography variant="100-medium" color="fixed-tertiary">
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
