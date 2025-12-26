"use client";

import { type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import { QueryProvider } from "./QueryProvider";
import { LanguageProvider } from "./LanguageContext";
import { ThemeMode, ThemeProvider } from "./ThemeContext";

import type { Locale } from "@/lib/i18n";

import "react-toastify/dist/ReactToastify.css";

export interface ProvidersProps {
  children: ReactNode;
  initialLocale: Locale;
  initialTheme?: ThemeMode;
}

export function Providers({
  children,
  initialLocale,
  initialTheme,
}: ProvidersProps) {
  return (
    <QueryProvider>
      <LanguageProvider locale={initialLocale}>
        <ThemeProvider initialTheme={initialTheme}>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </LanguageProvider>
    </QueryProvider>
  );
}
