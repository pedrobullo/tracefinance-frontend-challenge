import i18n from "i18next";

import { ptBR, type TranslationKeys } from "./translations/pt-BR";
import { enUS } from "./translations/en-US";

export type Locale = "pt-BR" | "en-US";

export const locales: Locale[] = ["en-US", "pt-BR"] as const;
export const defaultLocale: Locale = "en-US";

export const translations: Record<Locale, TranslationKeys> = {
  "pt-BR": ptBR,
  "en-US": enUS,
};

i18n.init({
  resources: {
    "pt-BR": { translation: ptBR },
    "en-US": { translation: enUS },
  },
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export type { TranslationKeys };

export default i18n;
