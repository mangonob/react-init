import { nanoid } from '@reduxjs/toolkit';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import NavBar from 'src/components/scaffold/nav-bar';
import VConsole from 'vconsole';

import styles from './index.module.scss';

interface WindowPopMessage<T = unknown> {
  type: 'window-pop';
  name: string;
  payload?: T;
}

export default function Scaffold() {
  useEffect(() => {
    const vConsole = new VConsole();

    return () => {
      vConsole.destroy();
    };
  });

  return (
    <section className={styles.app}>
      <NavBar />
      <Button
        onClick={() => {
          window.runnerPop(
            `window:${window.name.slice(
              0,
              8
            )} Pop At ${new Date().toLocaleTimeString()}`
          );
        }}
      >
        Post message
      </Button>
      <section className={styles.appContent}>
        <Outlet></Outlet>
      </section>
    </section>
  );
}

declare global {
  interface Window {
    runnerPop<T>(this: Window, data?: T): void;
    runnerPush<T>(this: Window, url: string): Promise<T | undefined>;
  }
}

function runnerPop<T>(this: Window, data: T): void {
  const opener = window.opener as Window | null;
  const message: WindowPopMessage = {
    type: 'window-pop',
    payload: data,
    name: this.name,
  };
  opener?.postMessage(message);
  this.WebViewJavascriptBridge?.callHandler('pop');
  this.window.close();
}

function runnerPush<T>(this: Window, url: string): Promise<T | undefined> {
  const windowName = nanoid();
  this.open(url, windowName);

  return new Promise((resolve) => {
    const listener = (e: MessageEvent<WindowPopMessage<T>>) => {
      if (e.data.type === 'window-pop' && e.data.name === windowName) {
        this.removeEventListener('message', listener);
        resolve(e.data.payload);
      }
    };

    this.addEventListener('message', listener);
  });
}

window.runnerPop = runnerPop;
window.runnerPush = runnerPush;
