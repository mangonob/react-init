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
import { Page } from './components/page';
import PageLoadErrorBoundary from './components/page/error-boundary';
import { useKeyboardShortcut } from './hooks';

import 'antd/es/style/reset.css';
import 'src/styles/index.scss';
import 'src/themes/dark.scss';
import 'src/themes/light.scss';
import './App.scss';

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      networkMode: 'always',
    },
  },
});

export default function App() {
  useKeyboardShortcut('Shift+Alt+D', () => {
    // eslint-disable-next-line no-debugger
    debugger;
  });

  useEffect(appSetup, []);

  const router = useMemo(
    () =>
      createHashRouter([
        {
          path: '/',
          lazy: () =>
            import('./components/scaffold').then(({ default: Component }) => ({
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
      <QueryClientProvider client={defaultQueryClient}>
        <ConfigProvider locale={zhCN}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

function appSetup(): (() => void) | void {
  import('antd/es/message').then((m) => {
    m.default.config({
      maxCount: 3,
    });
  });
}
