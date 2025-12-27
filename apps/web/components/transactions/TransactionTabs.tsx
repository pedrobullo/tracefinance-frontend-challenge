import { Typography } from "@repo/ui";
import type { TransactionType } from "@repo/types/constants";

type TabValue = "ALL" | TransactionType;

interface Tab {
  value: TabValue;
  label: string;
}

interface TransactionTabsProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

const tabs: Tab[] = [
  { value: "ALL", label: "All" },
  { value: "TED", label: "TED" },
  { value: "PIX", label: "PIX" },
];

export function TransactionTabs({
  activeTab,
  onTabChange,
}: TransactionTabsProps) {
  return (
    <div className="flex items-end">
      {tabs.map((tabItem) => {
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
              className={`w-full h-px ${isActive ? "bg-border-brand" : "bg-border-primary"}`}
            />
          </button>
        );
      })}
      <div className="flex-1 h-px bg-border-primary self-end" />
    </div>
  );
}

export type { TabValue };
