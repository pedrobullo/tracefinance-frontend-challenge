import { Typography } from "@repo/ui";
import {
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
  type TransactionType,
  type TransactionStatus,
} from "@repo/types/constants";
import { useTranslation } from "@/contexts";

type TabValue = "ALL" | TransactionType;
type StatusTabValue = TransactionStatus | undefined;

interface TransactionTabsProps {
  activeTab: TabValue;
  activeStatus: StatusTabValue;
  onTabChange: (tab: TabValue) => void;
  onStatusChange: (status: StatusTabValue) => void;
}

export function TransactionTabs({
  activeTab,
  activeStatus,
  onTabChange,
  onStatusChange,
}: TransactionTabsProps) {
  const { t } = useTranslation();

  const typeTabs: { value: TabValue; label: string }[] = [
    { value: "ALL", label: t("tabs.all") },
    { value: TRANSACTION_TYPE.TED, label: "TED" },
    { value: TRANSACTION_TYPE.PIX, label: "PIX" },
  ];

  const statusTabs: { value: StatusTabValue; label: string }[] = [
    { value: undefined, label: t("tabs.all") },
    { value: TRANSACTION_STATUS.PENDING, label: t("tabs.pending") },
    { value: TRANSACTION_STATUS.COMPLETED, label: t("tabs.completed") },
    { value: TRANSACTION_STATUS.FAILED, label: t("tabs.failed") },
  ];
  return (
    <div className="flex items-center gap-2 border-b border-border-primary">
      <div className="flex items-end">
        {typeTabs.map((tabItem) => {
          const isActive = activeTab === tabItem.value;
          return (
            <button
              key={tabItem.value}
              type="button"
              onClick={() => onTabChange(tabItem.value)}
              className="flex flex-col items-start gap-2 cursor-pointer"
            >
              <div className="px-3 py-2">
                <Typography
                  variant={isActive ? "100-medium" : "100-light"}
                  color={isActive ? "primary" : "disable-primary"}
                >
                  {tabItem.label}
                </Typography>
              </div>
              <div
                className={`w-full h-px ${isActive ? "bg-border-brand" : "bg-transparent"}`}
              />
            </button>
          );
        })}
      </div>
      <div className="h-2.5 w-px bg-border-primary mb-px" />
      <div className="flex items-end">
        {statusTabs.map((tabItem) => {
          const isActive = activeStatus === tabItem.value;
          return (
            <button
              key={tabItem.value ?? "all-status"}
              type="button"
              onClick={() => onStatusChange(tabItem.value)}
              className="flex flex-col items-start gap-2 cursor-pointer"
            >
              <div className="px-3 py-2">
                <Typography
                  variant={isActive ? "100-medium" : "100-light"}
                  color={isActive ? "primary" : "disable-primary"}
                >
                  {tabItem.label}
                </Typography>
              </div>
              <div
                className={`w-full h-px ${isActive ? "bg-border-brand" : "bg-transparent"}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { TabValue, StatusTabValue };
