import { useEffect, useState } from 'react';

export function useElementSize(element?: HTMLElement): [number, number] {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (element) {
      const getSize = () =>
        setSize([element.clientWidth, element.clientHeight]);
      getSize();
      element.addEventListener('resize', getSize);
      return () => element.removeEventListener('resize', getSize);
    }
  }, [element]);

  return size;
}
