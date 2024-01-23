import { useLayoutEffect, useState } from 'react';

export function useRequest<T>(
  fetch: () => Promise<T>
): [T | undefined, boolean] {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const i = setImmediate(() => {
      setIsLoading(true);
      fetch()
        .then((d) => setData(d))
        .finally(() => setIsLoading(false));
    });
    return () => clearImmediate(i);
  }, [fetch]);

  return [data, isLoading];
}
