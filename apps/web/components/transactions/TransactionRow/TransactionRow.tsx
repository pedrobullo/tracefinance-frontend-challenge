import { Typography, TableRow, TableCell } from "@repo/ui";
import type { Transaction } from "@repo/types/transaction";
import { TransactionStatusBadge } from "../TransactionStatusBadge/TransactionStatusBadge";
import { TransactionAmount } from "../TransactionAmount/TransactionAmount";

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
    <TableRow>
      <TableCell>
        <Typography variant="100-light" color="primary">
          {transaction.id}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="100-light" color="primary">
          {transaction.description || "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="100-light" color="primary">
          {transaction.type}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="100-light" color="primary">
          {formatDate(transaction.createdAt)}
        </Typography>
      </TableCell>
      <TableCell>
        <TransactionStatusBadge status={transaction.status} />
      </TableCell>
      <TableCell>
        <TransactionAmount
          amount={transaction.amount}
          currency={transaction.currency}
        />
      </TableCell>
    </TableRow>
  );
}
