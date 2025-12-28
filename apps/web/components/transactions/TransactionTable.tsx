import type { Transaction } from "@repo/types/transaction";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableRowSkeleton,
  Typography,
  EmptyState,
} from "@repo/ui";
import { InboxIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "@/contexts";
import { TransactionRow } from "./TransactionRow";

const TABLE_COLUMNS = [
  { key: "id", translationKey: "table.headers.id", width: "w-[150px]" },
  {
    key: "description",
    translationKey: "table.headers.description",
    width: "w-[150px]",
  },
  { key: "method", translationKey: "table.headers.method", width: "w-[100px]" },
  { key: "date", translationKey: "table.headers.date", width: "w-[85px]" },
  { key: "status", translationKey: "table.headers.status", width: "w-[108px]" },
  { key: "amount", translationKey: "table.headers.amount", width: "w-[123px]" },
];

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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <TableHeaderCell key={column.key} width={column.width}>
                <Typography variant="75-light" color="tertiary">
                  {t(column.translationKey)}
                </Typography>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} columns={TABLE_COLUMNS.length} />
              ))}
            </>
          ) : (
            transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
