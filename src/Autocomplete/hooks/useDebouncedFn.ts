import { useState, useEffect } from "react";

export const useDebouncedFn = <T extends unknown>(fn: () => T, delay = 300) => {
  const [debouncedFn, setDebouncedFn] = useState(() => fn);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFn(() => fn);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [fn, delay]);

  return debouncedFn;
};
