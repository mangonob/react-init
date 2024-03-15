import React, { HTMLAttributes } from 'react';
import { useElementSize } from 'src/hooks';

export interface SizeWithProps extends HTMLAttributes<HTMLDivElement> {
  element: string | HTMLElement;
  width?: boolean;
  height?: boolean;
}

export function SizeWith(props: SizeWithProps) {
  const { element, width = true, height = true, style, ...extra } = props;
  const [w, h] = useElementSize(element, { width, height });
  return <div style={{ width: w, height: h, ...style }} {...extra}></div>;
}
