import type { Transaction } from "@repo/types/transaction";

import {
  TransactionTableHeader,
  defaultColumns,
} from "./TransactionTableHeader";
import { TransactionRow } from "./TransactionRow";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function TransactionTable({
  transactions,
  isLoading = false,
}: TransactionTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border-brand border-t-transparent" />
      </div>
    );
  }

  return (
    <table className="w-full">
      <TransactionTableHeader columns={defaultColumns} />
      <tbody>
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
}
