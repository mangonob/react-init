/* eslint-disable unicorn/filename-case */
import React, { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import 'antd/es/style/reset.css';
import './App.css';

export default function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          lazy: () =>
            import('./pages/examples').then(({ default: Component }) => ({
              Component,
            })),
        },
      ]),
    []
  );

  return (
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  );
}
