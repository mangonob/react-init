/**
 * @description 权限域组件
 * @author 高炼
 */

import React, { PropsWithChildren } from 'react';
import { useScopes } from './hooks';
import { Scope } from './utils';

export interface ScopesProps {
  /** 权限域列表 */
  scopes: Scope[];
  /** 决策模式（所有/任一） */
  mode: 'and' | 'or';
}

export type ScopesMode = 'and' | 'or';

/**
 * 权限控制组件，没有给定域权限时，不进行渲染
 * @param props
 * @returns
 */
export function Scopes(props: PropsWithChildren<ScopesProps>) {
  const { scopes, mode = 'or', children } = props;

  const isScopeAllow = useScopes(scopes, mode);

  return <>{isScopeAllow && children}</>;
}
