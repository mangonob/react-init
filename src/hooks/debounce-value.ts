import { useEffect, useState } from 'react';

export function useDebounceValue<T>(value: T, ms: number) {
  const [state, setState] = useState(value);

  useEffect(() => {
    if (!Object.is(value, state)) {
      const i = setTimeout(() => {
        setState(value);
      }, ms);
      return () => clearTimeout(i);
    }
  }, [ms, state, value]);

  return state;
}
