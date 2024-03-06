/* eslint-disable unicorn/filename-case */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React, { useMemo } from 'react';
import {
  createHashRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

import 'antd/es/style/reset.css';
import 'src/styles/global.scss';
import 'src/themes/light.scss';
import 'src/themes/dark.scss';
import './App.scss';
import { Page } from './components/page';

export default function App() {
  const router = useMemo(
    () =>
      createHashRouter([
        {
          path: '/',
          lazy: () =>
            import('./pages/scaffold').then(({ default: Component }) => ({
              Component,
            })),
          children: [
            {
              index: true,
              lazy: () =>
                import('./components/redirect').then(
                  ({ default: Component }) => ({
                    element: <Component path="/differ" />,
                  })
                ),
            },
            {
              path: '*',
              Component: () => {
                const location = useLocation();
                return <Page path={location.pathname} />;
              },
              errorElement: <h1>Page not found</h1>,
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
