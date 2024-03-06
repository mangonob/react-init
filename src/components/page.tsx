import React, { ComponentType, Suspense } from 'react';
import { useRouteError } from 'react-router';

export interface PageProps<P> {
  path: string;
  props?: P;
}

export function Page<P>(props: PageProps<P>) {
  const { path: _path, props: _props } = props;
  const path = _path.startsWith('/') ? _path : '/' + _path;

  const Lazy = React.lazy(
    () =>
      import(`../pages${path}`).catch((error: Error) => {
        throw new PageLoadError(error);
      }) as Promise<{
        default: ComponentType<P | undefined>;
      }>
  );

  return (
    <Suspense fallback={<></>}>
      <Lazy {...(_props as any)} />
    </Suspense>
  );
}

export class PageLoadError extends Error {
  error: Error;

  constructor(error: Error) {
    super();
    this.error = error;
  }
}

export function PageLoadErrorBoundary() {
  const error = useRouteError();

  return <p>Page not found</p>;
}
