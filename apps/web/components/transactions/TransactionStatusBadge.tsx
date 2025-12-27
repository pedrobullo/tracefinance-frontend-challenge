import { Badge } from "@repo/ui";
import type { TransactionStatus } from "@repo/types/constants";
import { useTranslation } from "@/contexts";

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

const statusVariantMap: Record<
  TransactionStatus,
  "success" | "warning" | "error"
> = {
  COMPLETED: "success",
  PENDING: "warning",
  FAILED: "error",
};

export function TransactionStatusBadge({
  status,
}: TransactionStatusBadgeProps) {
  const { t } = useTranslation();

  return (
    <Badge variant={statusVariantMap[status]}>{t(`status.${status}`)}</Badge>
  );
}
