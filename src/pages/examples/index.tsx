import {
  QueryFunction,
  QueryKey,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Button, Flex } from 'antd';
import { produce } from 'immer';
import React from 'react';
import { SizeWith } from 'src/components/size-with';
import { create } from 'zustand';
import { redux } from 'zustand/middleware';
import { fetchImpliedVolatilityData } from '../warrant/children/implied-volatility/children/implied-volatility-graph/api';

import styles from './index.module.scss';

export interface ExampleState {
  count: number;
  logs: string[];
}

export type CountAction =
  | {
      type: 'increment';
      payload: number;
    }
  | { type: 'decrement' };

export type LogAction =
  | {
      type: 'log';
      payload: string;
    }
  | {
      type: 'logs';
      payload: string[];
    }
  | {
      type: 'clearLogs';
    };

const countReducer: Reducer<ExampleState, CountAction> = (state, action) => {
  return produce(state, (s) => {
    switch (action.type) {
      case 'increment':
        s.count += action.payload;
        break;
      case 'decrement':
        s.count -= 1;
        break;
    }
  });
};

const logReducer: Reducer<ExampleState, LogAction> = (state, action) => {
  return produce(state, (s) => {
    switch (action.type) {
      case 'clearLogs':
        s.logs = [];
        break;
      case 'log':
        s.logs.push(action.payload);
        break;
      case 'logs':
        s.logs.push(...action.payload);
        break;
    }
  });
};

export const useExampleState = create(
  redux(combineReducer(countReducer, logReducer), {
    count: 0,
    logs: [],
  })
);

export default function Examples() {
  const { dispatch, count, logs } = useExampleState();

  const queryClient = useQueryClient();

  useQuery({
    queryKey: generateQueryKey(['iv'], '22758'),
    queryFn: generateQueryFn(fetchImpliedVolatilityData),
  });

  useQuery({
    queryKey: ['demo', count],
    queryFn: ({ signal }) => {
      return new Promise((resolve) => {
        const t = setTimeout(() => {
          console.info('Resolved');
          resolve(count);
        }, 500);

        signal.addEventListener('abort', () => {
          clearTimeout(t);
          console.info('Abort');
        });
      });
    },
  });

  return (
    <div className={styles.example}>
      <Flex gap={20} vertical>
        <span>Count: {count}</span>
        <Button onClick={() => dispatch({ type: 'increment', payload: 42 })}>
          Increment
        </Button>
        <Button onClick={() => dispatch({ type: 'decrement' })}>
          Decrement
        </Button>
        <Button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ['demo', count] })
          }
        >
          Reload IV
        </Button>
        <ul>
          {logs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
        <div className={styles.chess}></div>
        <SizeWith
          element={`.${styles.chess}`}
          className={styles.chess2}
        ></SizeWith>
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

export type Prefixed<
  E extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
  T = unknown,
> = [T, ...E];

export type Postfixed<
  E extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
  T = unknown,
> = [...E, T];

export type Concatenate<
  E1 extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
  E2 extends ReadonlyArray<unknown> = ReadonlyArray<unknown>,
> = [...E1, ...E2];

export type sstypes = Concatenate<[string, number], [symbol, undefined]>;

function generateQueryFn<P = unknown, D = unknown>(
  fn: (_: P) => Promise<D>
): QueryFunction<D, Prefixed<QueryKey, P>> {
  return ({ queryKey: [parameters] }) => fn(parameters);
}
