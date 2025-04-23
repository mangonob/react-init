/* eslint-disable unicorn/filename-case */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useKeyboardShortcut } from './hooks';
import { useRouter } from './routes/hooks';

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

  const router = useRouter();

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
