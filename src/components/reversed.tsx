import React, { PropsWithChildren } from 'react';

export type ReversedProps = PropsWithChildren<{
  reversed?: boolean;
}>;

export default function Reversed(props: ReversedProps) {
  const { reversed = true, children } = props;
  return reversed ? React.Children.toArray(children).reverse() : children;
}
