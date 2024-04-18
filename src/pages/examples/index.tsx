import {
  QueryKey,
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Button, Flex, Spin } from 'antd';
import React, { Suspense, memo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Prefixed } from 'src/foundation/array';

import styles from './index.module.scss';
import { nanoid } from 'nanoid';

export default function Examples() {
  const { reset } = useQueryErrorResetBoundary();
  const [open, setOpen] = useState(false);

  return (
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
        <Button onClick={() => setOpen(!open)}>
          {open ? 'Opened' : 'Closed'}{' '}
        </Button>
        {Array.from({ length: 100 }).map((_, i) => {
          return <_Foo key={`foo-${i}`} label={i.toString()} />;
        })}
      </Flex>
    </div>
  );
}

export type Reducer<S, Action> = (s: S, action: Action) => S;

export function combineReducer<S, Action1, Action2>(
  reducer1: Reducer<S, Action1>,
  reducer2: Reducer<S, Action2>
): Reducer<S, Action1 | Action2> {
  return (s, a) => reducer2(reducer1(s, a as Action1), a as Action2);
}

export function generateQueryKey<
  TQueryKey extends QueryKey = QueryKey,
  P = unknown,
>(queryKey: TQueryKey, p: P): Prefixed<TQueryKey, P> {
  return [p, ...queryKey];
}

function MyComponents() {
  const { data } = useSuspenseQuery({
    queryKey: ['demo'],
    queryFn: ({ signal }) => {
      return new Promise<number>((resolve, reject) => {
        const t = setTimeout(() => {
          reject(new Error('42'));
        }, 1500);

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

const Foo: React.FC<{ label: string }> = (props) => {
  const { label } = props;
  console.info('Rerender foo', nanoid());
  return <span>Foo: {label}</span>;
};

const _Foo = memo(Foo);
