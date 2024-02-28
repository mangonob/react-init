import React, { ComponentType, Suspense } from 'react';

export interface PageProps<P> {
  path: string;
  props?: P;
}

export function Page<P>(props: PageProps<P>) {
  const { path: _path, props: _props } = props;
  const path = _path.startsWith('/') ? _path : '/' + _path;

  const Lazy = React.lazy(
    () =>
      import(`../pages${path}`) as Promise<{
        default: ComponentType<P | undefined>;
      }>
  );

  return (
    <Suspense fallback={<></>}>
      <Lazy {...(_props as any)} />
    </Suspense>
  );
}
