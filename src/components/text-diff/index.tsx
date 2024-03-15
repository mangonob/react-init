/* eslint-disable unicorn/no-for-loop */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { longestCommonSubsequence } from 'src/foundation';

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

  const [fromLCS, toLCS] = longestCommonSubsequence(source, dest);

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

  const uniformItems = items.reduce((items: DiffItem<string>[], next) => {
    const prev = items.at(-1);
    if (prev) {
      const tail = items.slice(0, -1);
      return prev.type === next.type
        ? [...tail, { type: prev.type, value: prev.value + next.value }]
        : [...items, next];
    } else {
      return [next];
    }
  }, []);

  return uniformItems;
}
