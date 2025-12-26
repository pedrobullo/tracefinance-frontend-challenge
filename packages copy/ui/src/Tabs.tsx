"use client";

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: TabsProps) {
  return (
    <div
      className={`flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium relative transition-colors
              ${isActive ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700"}
            `}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
