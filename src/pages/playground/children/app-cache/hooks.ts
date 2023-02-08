import { useEffect, useState } from 'react';
import { NativeBindings, getAppCache } from 'runner-bridge';

/**
 * Fetch and monitor app cache value changed
 * @param key Key for app cahce
 * @returns
 */
export function useAppCahce(key: string): string | undefined {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    getAppCache(key).then((value) => {
      setValue(value);
    });

    return NativeBindings.instance().listenAppCache(({ value }) => {
      setValue(value);
    }).cancel;
  });

  return value;
}
