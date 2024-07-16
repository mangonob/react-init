import { useLayoutEffect, useState } from 'react';

export function useRequest<T>(
  fetch: () => Promise<T>
): [T | undefined, boolean] {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const i = setInterval(() => {
      setIsLoading(true);
      fetch()
        .then((d) => setData(d))
        .finally(() => setIsLoading(false));
    }, 0);
    return () => clearInterval(i);
  }, [fetch]);

  return [data, isLoading];
}
