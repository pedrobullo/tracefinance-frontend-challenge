"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  type ReactNode,
  useMemo,
  useState,
} from "react";

import { setCookie } from "@/lib/cookies";
import { COOKIE_NAMES } from "@/constants/cookies";
import { getSystemTheme } from "@/utils/themeMode";

export type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const defaultTheme = getSystemTheme();

  const [theme, setThemeState] = useState<ThemeMode>(
    initialTheme || defaultTheme
  );

  const setTheme = useCallback(
    (value: ThemeMode | ((prev: ThemeMode) => ThemeMode)) => {
      setThemeState((prev) => {
        const newTheme = value instanceof Function ? value(prev) : value;
        setCookie(COOKIE_NAMES.THEME, newTheme);
        return newTheme;
      });
    },
    []
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
