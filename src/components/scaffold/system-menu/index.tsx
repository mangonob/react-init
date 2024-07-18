import { Menu, MenuProps } from 'antd';
import { isArray } from 'lodash-es';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import menus from 'src/routes/menus.yaml';

interface SystemMenuProps extends MenuProps {}

type MenuItem = {
  title: string;
} & (
  | {
      /** 子菜单 */
      children: MenuItem[];
    }
  | {
      /** 跳转链接 */
      target: string;
    }
);

export default function SystemMenu(props: SystemMenuProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = useMemo((): NonNullable<MenuProps['items']> => {
    const _menus = menus as MenuItem[];
    return isArray(_menus)
      ? _menus.map((m, i) => {
          return {
            key: i,
            label: m.title,
            onClick: () => {
              if ('target' in m) {
                const { target } = m;
                if (target !== pathname) {
                  navigate(target);
                }
              }
            },
          } as NonNullable<MenuProps['items']>[number];
        })
      : [];
  }, [pathname, navigate]);

  return <Menu items={items} {...props}></Menu>;
}
