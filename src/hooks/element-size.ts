import { useEffect, useState } from 'react';

export interface UseElementSizeOptions {
  width?: boolean;
  height?: boolean;
}

export function useElementSize(
  element?: string | HTMLElement,
  options?: UseElementSizeOptions
): [number, number] {
  const { width = true, height = true } = options || {};
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (width || height) {
      const el =
        typeof element === 'string' ? document.querySelector(element) : element;

      if (el instanceof HTMLElement) {
        setW(el.clientWidth);
        setH(el.clientHeight);

        const observer = new ResizeObserver((entries) => {
          const [entry] = entries;
          if (width) {
            setW(entry.contentRect.width);
          }
          if (height) {
            setH(entry.contentRect.height);
          }
        });

        observer.observe(el);
        return () => observer.unobserve(el);
      }
    }
  }, [element, height, width]);

  return [w, h];
}
