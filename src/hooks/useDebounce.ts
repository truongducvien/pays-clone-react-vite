import { useEffect, useState } from 'react';

interface UseDebounceOptions {
  timeout: number;
}

export default function useDebounce(value: string, options?: UseDebounceOptions) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value || '');

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedValue(value);
    }, options?.timeout || 1000);
    return () => {
      clearTimeout(delay);
    };
  }, [value, options]);

  return debouncedValue;
}
