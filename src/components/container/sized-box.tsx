import React from 'react';
import { HTMLAttributes, PropsWithChildren } from 'react';

export function SizedBox(
  props: PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & {
      width?: number | string;
      height?: number | string;
    }
  >
) {
  const { width, height, style, ...extraProps } = props;
  return <div style={{ ...style, width, height }} {...extraProps}></div>;
}
