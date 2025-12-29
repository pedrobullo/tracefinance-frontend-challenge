import type { Currency } from "@repo/types/schemas";
import type { Locale } from "@/lib/i18n";

export function formatCurrency(
  amountInCents: number,
  currency: Currency,
  locale: Locale
): string {
  const amountInUnits = Math.abs(amountInCents) / 100;

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
  return formatter.format(amountInUnits);
}
