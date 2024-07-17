import { Menu, MenuProps } from 'antd';
import { isArray } from 'lodash-es';
import React, { useMemo } from 'react';
import menus from 'src/routes/menus.yml';

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
  const items = useMemo((): NonNullable<MenuProps['items']> => {
    const _menus = menus as MenuItem[];
    if (isArray(_menus)) {
      return _menus.map((m) => {
        return { label: m.title } as NonNullable<MenuProps['items']>[number];
      });
    } else {
      return [];
    }
  }, [menus]);

  return <Menu items={items} {...props}></Menu>;
}
