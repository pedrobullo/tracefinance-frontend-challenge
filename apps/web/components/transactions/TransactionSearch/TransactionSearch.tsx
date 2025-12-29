"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@repo/ui";
import { useDebounce } from "@/hooks";
import { useTranslation } from "@/contexts";

const TYPE_DELAY = 500;

interface TransactionSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TransactionSearch({ value, onChange }: TransactionSearchProps) {
  const { t } = useTranslation();

  const debouncedOnChange = useDebounce(
    (newValue: string) => onChange(newValue),
    TYPE_DELAY
  );

  return (
    <Input
      type="text"
      key={value}
      defaultValue={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        debouncedOnChange(e.target.value)
      }
      placeholder={t("filters.search")}
      leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
      fullWidth
    />
  );
}
