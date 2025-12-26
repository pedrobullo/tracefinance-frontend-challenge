"use client";

import { useTranslation } from "@/contexts";
import { useTheme } from "@/contexts/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const { setLanguage, t, language } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`flex gap-4 p-8 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
    >
      <h1 className="text-2xl font-bold text-gray-600">
        {t("pages.transactions")}
      </h1>

      <div>
        <button
          onClick={() => setLanguage("pt-BR")}
          className={`px-3 py-1 rounded text-white cursor-pointer ${language === "pt-BR" ? "bg-green-400/50" : "bg-transparent"}`}
        >
          {t("language.pt-BR")}
        </button>
        <button
          onClick={() => setLanguage("en-US")}
          className={`px-3 py-1 rounded text-white cursor-pointer ${language === "en-US" ? "bg-green-400/50" : "bg-transparent"}`}
        >
          {t("language.en-US")}
        </button>
      </div>

      <div>
        {/* light/dark mode buttons */}
        <button className="cursor-pointer" onClick={toggleTheme}>
          {theme === "light" ? (
            <MoonIcon className="w-6 h-6 text-gray-600" />
          ) : (
            <SunIcon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
}
