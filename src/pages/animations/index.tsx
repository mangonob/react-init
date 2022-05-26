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
      borderRadius: ['20%', '50%'],
      rotate() {
        return anime.random(-360, 360);
      },
      duration: 1000,
      autoplay: false,
      width: '*=2',
      height: '*=2',
      marginLeft: '300px',
      delay: (el, i) => {
        console.log(el);
        return i * 100;
      },
      easing: 'easeOutQuad',
    });
  });

  return (
    <div className={styles.animations}>
      <Button onClick={onClick}>Reverse</Button>
      {Array.from({ length: 4 })
        .fill(0)
        .map((_, index) => (
          <div className={styles.item} key={index}></div>
        ))}
    </div>
  );
}
