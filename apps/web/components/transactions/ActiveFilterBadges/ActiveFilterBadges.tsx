import { Badge, Typography } from "@repo/ui";
import { useTranslation } from "@/contexts";

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

interface ActiveFilterBadgesProps {
  filters: ActiveFilter[];
  onRemove: (key: string) => void;
}

export function ActiveFilterBadges({
  filters,
  onRemove,
}: ActiveFilterBadgesProps) {
  const { t } = useTranslation();

  if (filters.length === 0) {
    return (
      <Typography variant="100-light" color="disable-primary">
        {t("filters.noFilterApplied")}
      </Typography>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map((filter) => (
        <Badge key={filter.key} onRemove={() => onRemove(filter.key)}>
          {filter.label}: {filter.value}
        </Badge>
      ))}
    </div>
  );
}

export type { ActiveFilter };
