import {
  useQueryClient,
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Button, Flex, Spin } from 'antd';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import styles from './index.module.scss';

export default function Examples() {
  const { reset } = useQueryErrorResetBoundary();
  const queryClient = useQueryClient();

  return (
    <>
      <div className={styles.example}>
        <Flex vertical align="start" gap={16}>
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => {
              return <Button onClick={resetErrorBoundary}>Reset</Button>;
            }}
          >
            <Suspense fallback={<Spin />}>
              <MyComponents />
            </Suspense>
          </ErrorBoundary>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ['demo'] })
            }
          >
            Invalid
          </Button>
        </Flex>
      </div>
      <ReactQueryDevtools />
    </>
  );
}

function MyComponents() {
  const { data } = useSuspenseQuery({
    queryKey: ['demo'],
    queryFn: ({ signal }) => {
      return new Promise<number>((resolve, reject) => {
        const t = setTimeout(() => {
          reject(42);
        }, 300);

        signal.addEventListener('abort', () => {
          clearTimeout(t);
        });
      });
    },
    networkMode: 'always',
    retry: false,
  });

  return <h1>Loaded count: {data}</h1>;
}
