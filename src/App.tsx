/* eslint-disable unicorn/filename-case */
import React, { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from '@loadable/component';

import './App.css';

export default function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: lazy(() => import('./pages/examples')),
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
