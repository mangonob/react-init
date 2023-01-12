/* eslint-disable unicorn/filename-case */
import React from 'react';
import { Route, Routes } from 'react-router';
import Playground from './pages/playground';

import './App.css';

export default function App() {
  return (
    <Routes>
      <Route index element={<Playground />} />
    </Routes>
  );
}
