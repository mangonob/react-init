import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import { useDrag } from '@use-gesture/react';

export default function Examples() {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const originalLeft = useRef(0);
  const originalTop = useRef(0);
  const bind = useDrag((e) => {
    if (e.first) {
      originalLeft.current = left;
      originalTop.current = top;
    } else if (e.last) {
      originalLeft.current = 0;
      originalTop.current = 0;
    } else {
      const [dx, dy] = e.movement;
      setLeft(originalLeft.current + dx);
      setTop(originalTop.current + dy);
    }
  });

  return (
    <div className={styles.examples}>
      <div className={styles.block} {...bind()} style={{ left, top }}></div>
    </div>
  );
}
