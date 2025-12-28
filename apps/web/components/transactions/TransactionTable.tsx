import type { Transaction } from "@repo/types/transaction";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  Skeleton,
  Typography,
  EmptyState,
} from "@repo/ui";
import { InboxIcon } from "@heroicons/react/24/outline";

import { useTranslation } from "@/contexts";
import { TransactionRow } from "./TransactionRow";

const TABLE_COLUMNS = [
  { key: "id", translationKey: "table.headers.id" },
  { key: "description", translationKey: "table.headers.description" },
  { key: "method", translationKey: "table.headers.method" },
  { key: "date", translationKey: "table.headers.date" },
  { key: "status", translationKey: "table.headers.status" },
  { key: "amount", translationKey: "table.headers.amount" },
];

const DEFAULT_LIMIT = 20;

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function TransactionTable({
  transactions,
  isLoading = false,
}: TransactionTableProps) {
  const { t } = useTranslation();

  const isEmpty = !isLoading && transactions.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        icon={InboxIcon}
        title={t("emptyState.noTransactions")}
        description={t("emptyState.noTransactionsDescription")}
      />
    );
  }

  if (isLoading) {
    return (
      <div>
        <div className="px-6 py-2.5">
          <Skeleton width="100%" height="20px" />
        </div>
        {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
          <div
            key={i}
            className="border-b border-border-primary last:border-b-0 px-6 py-5"
          >
            <Skeleton width="100%" height={25.6} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <TableHeaderCell key={column.key}>
                <Typography variant="75-light" color="tertiary">
                  {t(column.translationKey)}
                </Typography>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
