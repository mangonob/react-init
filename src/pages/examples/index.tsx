import {
  useQueryClient,
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Button, Flex, Spin } from 'antd';
import React, { Suspense, useId, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import styles from './index.module.scss';
import { nanoid } from 'nanoid';

export default function Examples() {
  const { reset } = useQueryErrorResetBoundary();
  const queryClient = useQueryClient();
  const [showItems, setShowItems] = useState(false);

  const renderItems = () => {
    return (
      <Flex wrap="wrap">
        {Array.from({ length: 10_000 }).map((_, i) => {
          return <span key={i}>Item {i}</span>;
        })}
      </Flex>
    );
  };

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
            {showItems && (
              <Suspense fallback={<Spin />}>
                <MyComponents id={0} />
                <Suspense fallback={<Spin />}>
                  <MyComponents id={1} />
                  <Suspense fallback={<Spin />}>
                    <MyComponents id={2} />
                    <Suspense fallback={<Spin />}>
                      <MyComponents id={3} />
                      <Suspense fallback={<Spin />}>
                        <MyComponents id={4} />
                        <Suspense fallback={<Spin />}>
                          <MyComponents id={5} />
                        </Suspense>
                      </Suspense>
                    </Suspense>
                  </Suspense>
                </Suspense>
              </Suspense>
            )}
          </ErrorBoundary>
          <Button onClick={() => queryClient.invalidateQueries()}>
            Invalid
          </Button>
          <Button onClick={() => setShowItems(!showItems)}>
            {showItems ? 'Hide items' : 'Show items'}
          </Button>
          {/* {showItems && renderItems()} */}
        </Flex>
      </div>
      <ReactQueryDevtools />
    </>
  );
}

function MyComponents(props: { id: number }) {
  const { id } = props;

  const { data } = useSuspenseQuery({
    queryKey: ['demo', id],
    queryFn: ({ signal }) => {
      return new Promise<number>((resolve) => {
        const t = setTimeout(() => {
          resolve(42);
        }, 1000);

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
