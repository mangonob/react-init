/**
 * @description 权限域Hooks
 * @author 高炼
 */

import { useMemo } from 'react';
import { ScopesMode } from '.';
import { and, or, permissionScopeInclude, Scope } from './utils';

/**
 * 是否有该域权限
 * @param scope 域
 * @returns {boolean}
 */
export function useScope(scope: Scope): boolean {
  // TODO
  const allowScopes: Scope[] = ['product:*', '*:read'];

  return useMemo(() => {
    return or(allowScopes, (a) => permissionScopeInclude(scope, a));
  }, [allowScopes, scope]);
}

/**
 * 是否列表中（所有/任一）域的权限
 * @param scopes 权限域列表
 * @param mode (default: 'or')
 * @returns {boolean}
 */
export function useScopes(scopes: Scope[], mode: ScopesMode = 'or'): boolean {
  // TODO
  const allowScopes: Scope[] = ['product:*', '*:read'];

  return useMemo(() => {
    return mode === 'and'
      ? and(scopes, (s) => or(allowScopes, (a) => permissionScopeInclude(s, a)))
      : or(scopes, (s) => or(allowScopes, (a) => permissionScopeInclude(s, a)));
  }, [allowScopes, mode, scopes]);
}
