import anime, { AnimeInstance } from 'animejs';
import { Button } from 'antd';
import React, { useCallback, useEffect, useRef } from 'react';
import styles from './index.module.scss';

export default function Animations() {
  const ani = useRef<AnimeInstance>();
  const isPlayed = useRef(false);

  const onClick = useCallback(() => {
    const maybeAni = ani.current;
    if (maybeAni) {
      if (isPlayed.current) maybeAni.reverse();
      isPlayed.current = true;
      maybeAni.play();
    }
  }, []);

  useEffect(() => {
    ani.current = anime({
      targets: `.${styles.item}`,
      autoplay: false,
      scale: [
        { value: 0.1, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeInOutQuad', duration: 1200 },
      ],
      delay: anime.stagger(200, { grid: [14, 5], from: 'center' }),
    });
  });

  const renderRow = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <div className={styles.item} key={index}></div>
    ));
  };

  const renderGrid = (row: number, column: number) => {
    return Array.from({ length: row }).map((_, index) => (
      <div key={index} className={styles.row}>
        {renderRow(column)}
      </div>
    ));
  };

  return (
    <div className={styles.animations}>
      <Button onClick={onClick}>Reverse</Button>
      <div className={styles.grid}>{renderGrid(5, 14)}</div>
    </div>
  );
}
