/* eslint-disable unicorn/filename-case */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React, { useMemo } from 'react';
import {
  createHashRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { Page, PageLoadErrorBoundary } from './components/page';
import { useKeyboardShortcut } from './hooks';

import 'antd/es/style/reset.css';
import 'src/styles/global.scss';
import 'src/themes/dark.scss';
import 'src/themes/light.scss';
import './App.scss';

import('antd/es/message').then((e) => {
  e.default.config({
    maxCount: 3,
  });
});

export default function App() {
  useKeyboardShortcut('Shift+Alt+D', () => {
    // eslint-disable-next-line no-debugger
    debugger;
  });

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
              ErrorBoundary: PageLoadErrorBoundary,
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
