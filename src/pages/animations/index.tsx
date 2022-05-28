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
      translateX: '200px',
      autoplay: false,
      rotate: anime.stagger([-360, 360]),
      delay: anime.stagger(50, { direction: 'reverse', easing: 'easeOutQuad' }),
    });
  });

  return (
    <div className={styles.animations}>
      <Button onClick={onClick}>Reverse</Button>
      {Array.from({ length: 12 })
        .fill(0)
        .map((_, index) => (
          <div className={styles.item} key={index}></div>
        ))}
    </div>
  );
}
