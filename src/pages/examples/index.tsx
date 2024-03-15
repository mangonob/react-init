import { Button, Flex } from 'antd';
import { produce } from 'immer';
import React from 'react';
import { SizeWith } from 'src/components/size-with';
import { create } from 'zustand';
import { redux } from 'zustand/middleware';

import styles from './index.module.scss';

export interface ExampleState {
  count: number;
  logs: string[];
}

export type Action =
  | {
      type: 'increment';
      payload: number;
    }
  | { type: 'decrement' }
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

const reducer: Reducer<ExampleState, Action> = (state, action) => {
  return produce(state, (s) => {
    switch (action.type) {
      case 'clearLogs':
        s.logs = [];
        break;
      case 'increment':
        s.count += action.payload;
        break;
      case 'decrement':
        s.count -= 1;
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
  redux(reducer, {
    count: 0,
    logs: [],
  })
);

export default function Examples() {
  const { dispatch, count, logs } = useExampleState();

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

export function comobineReducer<S, Action1, Action2>(
  reducer1: Reducer<S, Action1>,
  reducer2: Reducer<S, Action2>
): Reducer<S, Action1 | Action2> {
  return (s, a) => reducer2(reducer1(s, a as Action1), a as Action2);
}
