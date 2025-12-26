"use client";

import { type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import type { Locale } from "@/lib/i18n";

import { QueryProvider } from "./QueryProvider";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";

import "react-toastify/dist/ReactToastify.css";

export interface ProvidersProps {
  children: ReactNode;
  locale: Locale;
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <QueryProvider>
      <LanguageProvider locale={locale}>
        <ThemeProvider>
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
