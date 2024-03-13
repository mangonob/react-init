import React, { useEffect, useState } from 'react';
import { HTMLAttributes } from 'react';

export interface SizeWithProps extends HTMLAttributes<HTMLDivElement> {
  element: string | HTMLElement;
  width?: boolean;
  height?: boolean;
}

export function SizeWith(props: SizeWithProps) {
  const { element, width = true, height = true, style, ...extra } = props;

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

  return <div style={{ width: w, height: h, ...style }} {...extra}></div>;
}
