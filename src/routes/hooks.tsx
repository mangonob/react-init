import { ComponentType, useMemo } from 'react';
import { createHashRouter, DataRouter, RouteObject } from 'react-router';
import Redirect from 'src/components/redirect';
import Scaffold from 'src/components/scaffold';
import { MenuItem } from 'src/components/scaffold/system-menu';
import menus from 'src/routes/menus.yaml';
import { createArray } from 'src/utils/array';

export function useRouter(): DataRouter {
  const [firstMenu] = useMenus();

  return useMemo(() => {
    const modules = {
      ...import.meta.glob('/src/pages/*/index.tsx'),
      ...import.meta.glob('/src/pages/*/index.jsx'),
      ...import.meta.glob('/src/pages/*/index.ts'),
      ...import.meta.glob('/src/pages/*/index.js'),
    };

    const pageRoutes = Object.entries(modules).flatMap(
      ([key, loader]): RouteObject[] => {
        const moduleReg = /^\/src\/pages\/([\w-_]+)\/index\.(t|j)sx?$/i;
        if (moduleReg.test(key)) {
          const path = key.replace(moduleReg, '$1');
          return [
            {
              path,
              lazy: async () => {
                const { default: Component } = (await loader()) as {
                  default: ComponentType;
                };
                return { Component };
              },
            },
          ];
        } else {
          return [];
        }
      }
    );

    const firstMenuHasTarget = firstMenu && 'target' in firstMenu;

    return createHashRouter([
      {
        path: '/',
        Component: Scaffold,
        hydrateFallbackElement: <></>,
        children: createArray([
          firstMenuHasTarget && {
            index: true,
            element: <Redirect path="/examples" />,
          },
          ...pageRoutes,
          {
            path: '*',
            Component: () => <h1>404 Not found</h1>,
          },
        ]),
      },
    ]);
  }, [firstMenu]);
}

export function useMenus(): MenuItem[] {
  return menus as MenuItem[];
}
