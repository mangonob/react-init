/* eslint-disable unicorn/filename-case */
import { Button, Divider } from 'antd';
import { capitalCase, paramCase } from 'change-case';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import './App.css';
import styles from './App.module.scss';

/** Async load theme stylesheet */
import('src/themes/dark.theme.scss');
import('src/themes/light.theme.scss');

export type Theme = 'dark' | 'light';

export default function App() {
  const [theme, setTheme] = useState<Theme>('light');

  const onSwitchTheme = useCallback(() => {
    switch (theme) {
      case 'dark':
        setTheme('light');
        break;
      case 'light':
        setTheme('dark');
        break;
    }
  }, [theme, setTheme]);

  return (
    <section className={classNames(`theme-${paramCase(theme)}`, styles.app)}>
      <h1>Current Theme: {capitalCase(theme)}</h1>
      <Button onClick={onSwitchTheme}>Switch Theme</Button>
      <Divider orientation="left">Text</Divider>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <Divider orientation="left">Tips</Divider>
      <p className={styles.success}>Success Color</p>
      <p className={styles.warning}>Warning Color</p>
      <p className={styles.danger}>Danger Color</p>
      <Divider orientation="left">Border</Divider>
      <p className={styles.borderPrimary}>Primary Border Color</p>
      <p className={styles.borderSecondary}>Secondary Border Color</p>
      <p className={styles.borderTertiary}>Tertiary Border Color</p>
    </section>
  );
}
