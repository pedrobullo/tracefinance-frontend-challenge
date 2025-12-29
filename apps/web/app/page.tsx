import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { locales, defaultLocale, type Locale } from "@/lib/i18n";

// Temporary redirect to /transactions with locale
function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage.split(",").map((lang) => {
    const [code = ""] = lang.trim().split(";q=");
    return code.trim();
  });

  for (const code of languages) {
    const exactMatch = locales.find((locale) => locale === code);
    if (exactMatch) return exactMatch;

    const baseCode = code.split("-")[0] ?? "";
    const partialMatch = locales.find((locale) =>
      locale.toLowerCase().startsWith(baseCode.toLowerCase())
    );
    if (partialMatch) return partialMatch;
  }

  return defaultLocale;
}

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = getPreferredLocale(acceptLanguage);

  redirect(`/${locale}/transactions`);
}
