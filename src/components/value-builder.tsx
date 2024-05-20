import { isEqual } from 'lodash-es';
import { ReactNode, memo } from 'react';

export interface ValueBuilderProps<T> {
  value: T;
  children: (v: T) => ReactNode;
}

function _ValueBuilder<T>(props: ValueBuilderProps<T>) {
  const { value, children } = props;
  return children(value);
}

const ValueBuilder = memo(_ValueBuilder, (l, r) =>
  isEqual(l.value, r.value)
) as typeof _ValueBuilder;

export default ValueBuilder;
