/* eslint-disable unicorn/filename-case */
import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Downloader from './pages/downloader';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Downloader />}></Route>
    </Routes>
  );
}
