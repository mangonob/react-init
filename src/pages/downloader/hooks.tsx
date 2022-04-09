import { useMemo } from 'react';

export function useItmsServices(plistUrl: string) {
  return useMemo(() => {
    return `itms-services://?action=download-manifest&url=${plistUrl}`;
  }, [plistUrl]);
}
