/* eslint-disable unicorn/filename-case */
import React, { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router';
import VConsole from 'vconsole';
import { MessageChannel } from './pages/message-channel';
import Playground from './pages/playground';

import './App.css';

export default function App() {
  useConsole();

  return (
    <Routes>
      <Route index element={<Playground />} />
      <Route path="welcome" element={<Playground />} />
      <Route path="messageChannel" element={<MessageChannel />} />
    </Routes>
  );
}

export function useConsole() {
  const console = useRef<VConsole>();

  useEffect(() => {
    console.current = new VConsole();

    return () => console.current?.destroy();
  }, []);
}
