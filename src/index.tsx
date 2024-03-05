import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const App = lazy(() => import('./App'));

createRoot(document.querySelector('#root') as Element).render(
  <Suspense>
    <App />
  </Suspense>
);
