import { Typography } from "@repo/ui";
import type { Transaction } from "@repo/types/transaction";

import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { TransactionAmount } from "./TransactionAmount";

interface TransactionRowProps {
  transaction: Transaction;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const hours = date.getHours();
  const period = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;

  return `${day} ${month} -${displayHours}${period}`;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <tr className="border-b border-border-primary last:border-b-0">
      <td className="px-6 py-5">
        <Typography variant="100-light" color="primary">
          {transaction.id}
        </Typography>
      </td>
      <td className="px-6 py-5">
        <Typography variant="100-light" color="primary">
          {transaction.description || "-"}
        </Typography>
      </td>
      <td className="px-6 py-5">
        <Typography variant="100-light" color="primary">
          {transaction.type}
        </Typography>
      </td>
      <td className="px-6 py-5">
        <Typography variant="100-light" color="primary">
          {formatDate(transaction.createdAt)}
        </Typography>
      </td>
      <td className="px-6 py-5">
        <TransactionStatusBadge status={transaction.status} />
      </td>
      <td className="px-6 py-5">
        <TransactionAmount
          amount={transaction.amount}
          currency={transaction.currency}
        />
      </td>
    </tr>
  );
}
