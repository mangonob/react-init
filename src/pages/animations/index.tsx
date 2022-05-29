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
    const animation = anime.timeline({
      autoplay: false,
      targets: `.${styles.item}`,
      easing: 'easeOutExpo',
    });
    ani.current = animation;

    animation.add({
      translateX: 300,
    });

    animation.add({
      translateY: 100,
      width: '+=100',
      height: '+=100',
      borderRadius: '50%',
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
      <div className={styles.grid}>{renderGrid(1, 1)}</div>
    </div>
  );
}
