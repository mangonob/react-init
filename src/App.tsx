/* eslint-disable unicorn/filename-case */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React, { useMemo } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

import 'antd/es/style/reset.css';
import './App.css';
import { Page } from './components/page';

export default function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          lazy: () =>
            import('./pages/scaffold').then(({ default: Component }) => ({
              Component,
            })),
          children: [
            {
              path: '*',
              Component: () => {
                const location = useLocation();
                return <Page path={location.pathname} />;
              },
            },
          ],
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
