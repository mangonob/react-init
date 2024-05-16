import { Flex } from 'antd';
import React, { HTMLAttributes } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import addSrc from './assets/input-bar-add.png';
import emojiSrc from './assets/input-bar-emoji.png';
import voiceSrc from './assets/input-bar-voice.png';

export default function InputBar(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...extra } = props;

  return (
    <Flex
      className={classNames(styles.inputBar, className)}
      vertical
      {...extra}
    >
      <Flex className={styles.inputs} align="center" gap={32}>
        <img src={voiceSrc} />
        <div className={styles.inputBox}></div>
        <img src={emojiSrc} />
        <img src={addSrc} />
      </Flex>
      <Flex
        className={styles.safeArea}
        vertical
        align="center"
        justify="flex-end"
      >
        <div className={styles.homeIndicator} />
      </Flex>
    </Flex>
  );
}
