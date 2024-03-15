import anime, { AnimeInstance } from 'animejs';
import { Button, Slider } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

export default function Animations() {
  const ani = useRef<AnimeInstance>();
  const [isPlayed, setPlay] = useState(false);
  const [progress, setProgress] = useState(0);

  const onClick = useCallback(() => {
    const maybeAni = ani.current;
    if (maybeAni) {
      if (isPlayed) {
        maybeAni.pause();
      } else {
        maybeAni.play();
      }
      setPlay(!isPlayed);
    }
  }, [isPlayed]);

  useEffect(() => {
    const animation = anime.timeline({
      autoplay: false,
      targets: `.${styles.item}`,
      easing: 'easeOutExpo',
      duration: 250,
      update(ani) {
        setProgress(ani.progress);
      },
    });
    ani.current = animation;

    animation
      .add({
        translateX: 0,
        translateY: 0,
        width: 20,
        height: 20,
      })
      .add({
        translateX: 300,
        translateY: 0,
      })
      .add({
        translateY: 100,
        width: 100,
        height: 100,
        borderRadius: '50%',
      })
      .add({
        translateX: 0,
        width: 20,
        height: 20,
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
      <Button onClick={onClick} icon={isPlayed ? '||' : '>'}></Button>
      <Slider
        value={progress}
        onChange={(value) => {
          const maybeAni = ani.current;
          if (maybeAni) {
            maybeAni.seek((maybeAni.duration * value) / 100);
          }
        }}
      ></Slider>
      <div className={styles.grid}>{renderGrid(1, 1)}</div>
    </div>
  );
}
