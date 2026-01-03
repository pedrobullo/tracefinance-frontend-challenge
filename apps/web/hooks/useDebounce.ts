import { useState } from "react";

/**
 * Debounce a function by time
 * @param {Function} func
 * @param {Number} delay
 */
export function useDebounce(func: (args: unknown[]) => void, delay: number) {
  const [timer, setTimer] = useState<number | undefined>();

  return (...args: Array<unknown>) => {
    clearTimeout(timer);

    const _temp = setTimeout(() => {
      // @ts-expect-error
      func(...args);
    }, delay);
    // @ts-expect-error
    setTimer(_temp);
  };
}
