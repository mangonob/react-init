import {
  BgColorsOutlined,
  DiffOutlined,
  ExperimentOutlined,
  ProductOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { isArray } from 'lodash-es';
import { ReactNode, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useMenus } from 'src/routes/hooks';

interface SystemMenuProps extends MenuProps {}

export type MenuItem = {
  title: string;
  iconName?: string;
  key?: string;
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

  const menus = useMenus();

  const items = useMemo((): NonNullable<MenuProps['items']> => {
    return isArray(menus)
      ? menus.map((m, i) => {
          const { title, iconName } = m;
          const icons: Record<string, ReactNode> = {
            example: <ExperimentOutlined />,
            design: <BgColorsOutlined />,
            differ: <DiffOutlined />,
            wechat: <WechatOutlined />,
            default: <ProductOutlined />,
          };

          return {
            key: itemKey(m, i),
            label: title,
            icon: icons[iconName ?? 'default'],
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
  }, [menus, pathname, navigate]);

  const selectedByRoute = menus.findIndex((m) => {
    if ('target' in m) {
      return m.target === pathname;
    }
  });

  const key =
    selectedByRoute >= 0
      ? itemKey(menus[selectedByRoute], selectedByRoute)
      : void 0;

  return (
    <Menu
      items={items}
      {...props}
      defaultSelectedKeys={key ? [key] : void 0}
    ></Menu>
  );
}

function itemKey(item: MenuItem, index: number): string {
  return item.key ?? `item-${index}`;
}
