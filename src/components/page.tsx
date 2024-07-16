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
    const moduleName = path.startsWith('/') ? path.slice(1) : path;
    const [module, submodule] = moduleName.split('/');
    // 结合 @rollurollupp/plugin-dynamic-import-vars 插件实现“动态”导入
    if (module && submodule) {
      return import(`../pages/${module}/${submodule}/index.tsx`).catch(
        (error: Error) => {
          throw new PageLoadError(error);
        }
      ) as Promise<{
        default: ComponentType<P | undefined>;
      }>;
    } else if (module) {
      return import(`../pages/${module}/index.tsx`).catch((error: Error) => {
        throw new PageLoadError(error);
      }) as Promise<{
        default: ComponentType<P | undefined>;
      }>;
    } else {
      throw new PageLoadError(new Error(`bad path ${path}`));
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
