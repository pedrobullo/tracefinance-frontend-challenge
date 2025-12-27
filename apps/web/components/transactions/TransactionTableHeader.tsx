import { Typography } from "@repo/ui";
import { useTranslation } from "@/contexts";

interface Column {
  key: string;
  translationKey: string;
  width?: string;
}

interface TransactionTableHeaderProps {
  columns?: Column[];
}

const defaultColumns: Column[] = [
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

export function TransactionTableHeader({
  columns = defaultColumns,
}: TransactionTableHeaderProps) {
  const { t } = useTranslation();

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-6 py-3 text-left ${column.width || ""}`}
          >
            <Typography variant="75-light" color="tertiary">
              {t(column.translationKey)}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export { defaultColumns };
export type { Column };
