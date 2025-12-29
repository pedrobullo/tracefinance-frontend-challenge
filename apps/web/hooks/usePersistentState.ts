import { useState, useEffect, useCallback } from "react";
import { logger } from "@repo/logger";

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    } catch (error) {
      logger.error(`Error loading ${key} from localStorage`, error, {
        component: "usePersistentState",
        key,
      });
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          const storageValue =
            typeof valueToStore === "string"
              ? valueToStore
              : JSON.stringify(valueToStore);
          window.localStorage.setItem(key, storageValue);
        }
      } catch (error) {
        logger.error(`Error saving ${key} to localStorage`, error, {
          component: "usePersistentState",
          key,
        });
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          try {
            setStoredValue(JSON.parse(e.newValue) as T);
          } catch {
            setStoredValue(e.newValue as T);
          }
        } catch (error) {
          logger.error(`Error parsing storage event for ${key}`, error, {
            component: "usePersistentState",
            key,
          });
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}
