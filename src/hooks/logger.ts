import { useEffect } from 'react';

export default function useLogger<D>(
  data: D,
  label = '',
  logger?: (label: string, d: D) => void
) {
  useEffect(() => {
    if (logger) {
      logger(label, data);
    } else {
      console.info(label, data);
    }
  }, [data, label, logger]);
}
