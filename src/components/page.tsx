import { Button, Result } from 'antd';
import React, { Attributes, ComponentType, Suspense } from 'react';
import { useNavigate, useRouteError } from 'react-router';

export interface PageProps<P> {
  path: string;
  props?: P;
}

export function Page<P extends Attributes>(props: PageProps<P>) {
  const { path, props: _props } = props;

  const Lazy = React.lazy(() => {
    const modules = import.meta.glob('/src/pages/**/index.tsx');

    const [, loader] =
      Object.entries(modules).find(([key]) => {
        const moduleName = key.replace(/(.*)pages\/(.*)\/index\.tsx/i, '$2');
        const relative = path.replace(/^\/*/i, '').replace(/\/*$/i, '');
        return relative === moduleName;
      }) ?? [];

    if (loader && typeof loader === 'function') {
      const _loader = loader as () => Promise<{
        default: ComponentType<unknown>;
      }>;
      return _loader().catch((error) => {
        throw new PageLoadError(error as Error);
      });
    } else {
      throw new PageLoadError(new Error(`bad page at path "${path}"`));
    }
  });

  return (
    <Suspense fallback={<></>}>
      <Lazy {...(_props as P)} />
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
  const navigate = useNavigate();

  return error instanceof PageLoadError ? (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          回首页
        </Button>
      }
    />
  ) : (
    <p>{`Error: ${(error as Error).message}`}</p>
  );
}
