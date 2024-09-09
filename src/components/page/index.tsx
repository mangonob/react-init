import { Spin } from 'antd';
import React, { Attributes, ComponentType, Suspense } from 'react';
import PageLoadError from './error-boundary/error';
import styles from './index.module.scss';

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
    <Suspense fallback={<Spin className={styles.spin} delay={33}></Spin>}>
      <Lazy {...(_props as P)} />
    </Suspense>
  );
}
