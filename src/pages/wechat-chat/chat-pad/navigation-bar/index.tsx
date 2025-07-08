import { Flex } from 'antd';
import cc from 'classcat';
import dayjs from 'dayjs';
import { HTMLAttributes, useEffect, useReducer, useState } from 'react';
import cellSignalSrc from './assets/cell-signal.svg';
import batterySrc from './assets/ios-battery.svg';
import backSrc from './assets/navigation-bar-back.svg';
import moreSrc from './assets/navigation-bar-more.svg';
import styles from './index.module.scss';

interface NavigationBarProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  unreadCount?: number;
  isInputing?: boolean;
}

export default function NavigationBar(props: NavigationBarProps) {
  const {
    title,
    unreadCount = 0,
    isInputing = false,
    className,
    ...extra
  } = props;

  const [date, setDate] = useState(0);
  const [inputingCount, inputingCountDispatch] = useReducer(
    (state: number, action: 'reset' | 'increment') => {
      switch (action) {
        case 'reset':
          return 0;
        case 'increment':
          return state + 1;
      }
    },
    0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isInputing) {
      inputingCountDispatch('reset');
      const interval = setInterval(() => {
        inputingCountDispatch('increment');
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isInputing]);

  return (
    <Flex className={cc([styles.navigationBar, className])} vertical {...extra}>
      <Flex className={styles.safeArea} align="center" gap={20}>
        <span>{dayjs(date).format('HH:mm')}</span>
        <div style={{ flex: 1 }}></div>
        <img src={cellSignalSrc}></img>
        <span className={styles.networkType}>4G</span>
        <div
          className={styles.battery}
          style={{
            backgroundImage: `url(${batterySrc})`,
          }}
        >
          <div className={styles.volume}></div>
        </div>
      </Flex>
      <Flex className={styles.toolbar} align="center" gap={18}>
        <img src={backSrc} />
        <div className={styles.title}>
          {unreadCount > 0 && (
            <Flex className={styles.unread} justify="center" align="center">
              <span>{unreadCount}</span>
            </Flex>
          )}
          {isInputing
            ? `对方正在输入${Array.from({ length: inputingCount % 4 })
                .fill('.')
                .join('')}`
            : title}
        </div>
        <img src={moreSrc} />
      </Flex>
    </Flex>
  );
}
