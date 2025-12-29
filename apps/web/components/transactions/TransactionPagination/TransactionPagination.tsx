import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Typography, Button } from "@repo/ui";

interface TransactionPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export function TransactionPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPreviousPage,
  onNextPage,
  hasPreviousPage,
  hasNextPage,
}: TransactionPaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center gap-2">
      <Typography variant="100-light" color="primary">
        {startItem}-{endItem} de {totalItems}
      </Typography>
      <Button
        hierarchy="quiet"
        size="small"
        iconOnly
        onClick={onPreviousPage}
        disabled={!hasPreviousPage}
        leftIcon={<ChevronLeftIcon />}
      />
      <Button
        hierarchy="quiet"
        size="small"
        iconOnly
        onClick={onNextPage}
        disabled={!hasNextPage}
        leftIcon={<ChevronRightIcon />}
      />
    </div>
  );
}
