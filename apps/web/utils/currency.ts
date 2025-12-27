import type { Currency } from "@repo/types/constants";
import type { Locale } from "@/lib/i18n";

export function formatCurrency(
  amount: number,
  currency: Currency,
  locale: Locale
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
  return formatter.format(Math.abs(amount));
}
