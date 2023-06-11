import { useEffect, useRef, useState } from 'react';

export function useThrottle(value: string, interval = 1250): string {
  const [throttledValue, setThrottledValue] = useState<string>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }

    return undefined; // made for eslint
  }, [value, interval]);

  return throttledValue;
}
