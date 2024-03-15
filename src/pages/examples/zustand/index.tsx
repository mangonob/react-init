import { Button, Input, Space } from 'antd';
import React from 'react';
import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export default function ZustandExample() {
  const { counter, increase } = useAppState();

  return (
    <Space direction="vertical">
      <Button onClick={increase}>{counter} </Button>
      Content: <Content></Content>
      UserInfo: <UserInput></UserInput>
      <UserInfo></UserInfo>
    </Space>
  );
}

function Content() {
  const { counter, increase } = useAppState();
  return <Button onClick={increase}>{counter}</Button>;
}

function UserInput() {
  const userToken = useAppState((s) => s.userToken);
  const setToken = useAppState((s) => s.setUserToken);
  return <Input value={userToken} onChange={(e) => setToken(e.target.value)} />;
}

function UserInfo() {
  const userToken = useAppState((s) => s.userToken);
  return <span>UserToken: {userToken}</span>;
}

type Setter<T> = (value: T) => void;

interface AppState {
  userToken?: string;
  counter: number;
  increase: () => void;
  setUserToken: Setter<string | undefined>;
}

const useAppState = create(
  devtools(
    persist(
      immer<AppState>((set) => {
        return {
          counter: 0,
          increase() {
            set((s) => {
              s.counter += 1;
            });
          },
          setUserToken(userToken) {
            set((s) => {
              s.userToken = userToken;
            });
          },
        };
      }),
      {
        getStorage: () => sessionStorage,
        name: 'appState@session',
      }
    )
  )
);

// Create zustand slice
interface Post {
  id: string;
  author: string;
  created: number;
  updated: number;
  title?: string;
  content?: string;
}
interface PostState {
  posts: Post[];
}

export const postSlice: StateCreator<PostState> = () => {
  return {
    posts: [],
  };
};

interface MessageState {
  messages: string[];
}

export const messageSlice: StateCreator<MessageState> = () => {
  return {
    messages: [],
  };
};

export const useRootState = create<PostState & MessageState>((...args) => {
  return {
    ...postSlice(...args),
    ...messageSlice(...args),
  };
});
