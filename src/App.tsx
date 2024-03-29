/* eslint-disable unicorn/filename-case */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React, { useEffect, useMemo } from 'react';
import {
  RouterProvider,
  createHashRouter,
  useLocation,
} from 'react-router-dom';
import { Page, PageLoadErrorBoundary } from './components/page';
import { useKeyboardShortcut } from './hooks';

import 'antd/es/style/reset.css';
import 'src/styles/global.scss';
import 'src/themes/dark.scss';
import 'src/themes/light.scss';
import './App.scss';

const globalQueryClient = new QueryClient();

export default function App() {
  useKeyboardShortcut('Shift+Alt+D', () => {
    // eslint-disable-next-line no-debugger
    debugger;
  });

  useEffect(() => {
    import('antd/es/message').then((e) => {
      e.default.config({
        maxCount: 3,
      });
    });
  }, []);

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
      <QueryClientProvider client={globalQueryClient}>
        <ConfigProvider locale={zhCN}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
