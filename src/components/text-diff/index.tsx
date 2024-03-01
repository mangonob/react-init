import classNames from 'classnames';
import React, { useMemo } from 'react';

import styles from './index.module.scss';

export interface TextDiffProps {
  source?: string;
  dest?: string;
}

export default function TextDiff(props: TextDiffProps) {
  const { source = '', dest = '' } = props;

  const items = useMemo(() => generateDiffItem(source, dest), [source, dest]);

  return (
    <span className={styles.textDiffer}>
      {items.map((item, i) => {
        const { type, value } = item;
        return (
          <span
            className={classNames({
              [styles.delete]: type === 'delete',
              [styles.insert]: type === 'insert',
            })}
            key={i}
          >
            {value}
          </span>
        );
      })}
    </span>
  );
}

type DiffItem<T> = {
  type: 'normal' | 'insert' | 'delete';
  value: T;
};

function generateDiffItem(source: string, dest: string): DiffItem<string>[] {
  return [
    {
      type: 'delete',
      value: source,
    },
    {
      type: 'insert',
      value: dest,
    },
  ];
}
