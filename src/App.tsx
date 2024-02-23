/* eslint-disable unicorn/filename-case */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React, { useMemo } from 'react';
import {
  createBrowserRouter,
  LazyRouteFunction,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { Redirect } from './components';

import 'antd/dist/reset.css';
import './App.css';

export default function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          lazy: () =>
            import('src/components/scaffold').then(
              ({ default: Component }) => ({
                Component,
              })
            ),
          children: [
            {
              index: true,
              element: <Redirect path="/protocol-dictionary" />,
            },
            {
              path: 'file-parser',
              lazy: createLazyPage('file-parser'),
            },
            {
              path: 'protocol-dictionary',
              lazy: createLazyPage('protocol-dictionary'),
            },
            {
              path: 'dictionary-diff',
              lazy: createLazyPage('dictionary-diff'),
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

function createLazyPage(name: string): LazyRouteFunction<RouteObject> {
  return () => {
    return import(`./pages/${name}`).then(({ default: Component }) => {
      return {
        Component: Component as () => JSX.Element,
      };
    });
  };
}
