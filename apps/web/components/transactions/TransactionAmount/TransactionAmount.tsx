import { Typography } from "@repo/ui";
import type { Transaction } from "@repo/types/transaction";

import { formatCurrency } from "@/utils/currency";
import { useTranslation } from "@/contexts";

interface TransactionAmountProps {
  amount: Transaction["amount"];
  currency: Transaction["currency"];
}

export function TransactionAmount({
  amount,
  currency,
}: TransactionAmountProps) {
  const { language } = useTranslation();

  const formattedAmount = formatCurrency(amount, currency, language);

  const isNegative = amount < 0;

  const displayAmount = isNegative ? `-${formattedAmount}` : formattedAmount;

  return (
    <Typography
      variant="100-light"
      color={isNegative ? "feedback-error-primary" : "primary"}
    >
      {displayAmount}
    </Typography>
  );
}
