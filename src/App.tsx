/* eslint-disable unicorn/filename-case */
import React, { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Examples from './pages/examples';

import './App.css';

export default function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <Examples />,
        },
      ]),
    []
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
