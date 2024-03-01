/* eslint-disable unicorn/no-for-loop */
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
  if (source.length === 0) {
    return [
      {
        type: 'insert',
        value: dest,
      },
    ];
  } else if (dest.length === 0) {
    return [
      {
        type: 'delete',
        value: source,
      },
    ];
  }

  const lens: [number[], number[]] = [
    Array.from<number>({ length: source.length + 1 }).fill(0),
    Array.from<number>({ length: source.length + 1 }).fill(0),
  ];

  const fromIndexes: number[] = [];
  const toIndexes: number[] = [];

  for (let i = 0; i < dest.length; i++) {
    const tch = dest[i];
    const [prev, curr] = lens;

    for (let j = 0; j < source.length; j++) {
      const fch = source[j];
      if (fch === tch) {
        if (
          (fromIndexes.length === 0 || j > fromIndexes[0]) &&
          (toIndexes.length === 0 || i > toIndexes[0])
        ) {
          fromIndexes.unshift(j);
          toIndexes.unshift(i);
        }
        curr[j + 1] = prev[j] + 1;
      } else if (curr[j] > prev[j + 1]) {
        curr[j + 1] = curr[j];
      } else {
        curr[j + 1] = prev[j + 1];
      }
    }
    lens[0] = curr;
    lens[1] = prev;
  }

  const fromLCS = fromIndexes.reverse();
  const toLCS = toIndexes.reverse();
  const items: DiffItem<string>[] = [];
  let fromIndex = 0;
  let toIndex = 0;

  for (let i = 0; i < fromLCS.length; ++i) {
    const fromI = fromLCS[i];
    const toI = toLCS[i];

    if (fromIndex < fromI) {
      items.push({
        type: 'delete',
        value: source.slice(fromIndex, fromI),
      });
    }

    if (toIndex < toI) {
      items.push({
        type: 'insert',
        value: dest.slice(toIndex, toI),
      });
    }

    items.push({
      type: 'normal',
      value: source[fromI],
    });

    fromIndex = fromI + 1;
    toIndex = toI + 1;
  }

  if (fromIndex < source.length) {
    items.push({
      type: 'delete',
      value: source.slice(fromIndex),
    });
  }

  if (toIndex < dest.length) {
    items.push({
      type: 'insert',
      value: dest.slice(toIndex),
    });
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const uniformItems = items.reduce((items: DiffItem<string>[], next) => {
    if (items.length <= 0) {
      return [next];
    } else {
      const prev = items.slice(-1)[0];
      const tail = items.slice(0, -1);
      return prev.type === next.type
        ? [...tail, { type: prev.type, value: prev.value + next.value }]
        : [...items, next];
    }
  }, []);

  return uniformItems;
}
