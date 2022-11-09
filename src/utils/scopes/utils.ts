/**
 * @description 权限域处理
 * @author 高炼
 */

import { zip } from 'lodash-es';

export interface ScopeSubmoduleMap {
  /** 产品管理 */
  product: 'file';
  /** 托管人 */
  custodian: 'file';
  /** 机构 */
  org: never;
  /** 代销 */
  sales: never;
  /** 系统管理 */
  user: never;
}

export type Permission = 'create' | 'read' | 'update' | 'delete' | '*';

export type Scope<K extends keyof ScopeSubmoduleMap = keyof ScopeSubmoduleMap> =

    | '*'
    | '*:*'
    | '*:*:*'
    | `${K | '*'}:${ScopeSubmoduleMap[K] | '*'}:${Permission}`
    | `${K | '*'}:${Permission}`;

/**
 * 权限检查，判断源Scope是否具有目标Scope的权限
 * @param source 源Scope
 * @param target 目标Scope
 * @returns {boolean}
 */
export function permissionScopeInclude(source: Scope, target: Scope): boolean {
  console.info('Source components', getScopeCompnents(source));
  console.info('Target components', getScopeCompnents(target));

  return and(
    zip(getScopeCompnents(source), getScopeCompnents(target)),
    ([s, t]) => s === t || t === '*'
  );
}

/**
 * 获取域的分量[module, submodule, permission]
 */
function getScopeCompnents(
  scope: Scope
): [
  keyof ScopeSubmoduleMap | '*' | '!',
  ScopeSubmoduleMap[keyof ScopeSubmoduleMap] | '*' | '!',
  Permission | '!'
] {
  switch (scope) {
    case '*':
    case '*:*':
      return ['*', '*', '*'];
    default: {
      const scopeComponents = scope.split(':');
      if (scopeComponents.length === 2) {
        return cast([scopeComponents[0], '*', scopeComponents[1]]);
      } else if (scopeComponents.length === 3) {
        return cast(scopeComponents);
      } else {
        // '!' 为空模块/空(无)权限占位
        return ['!', '!', '!'];
      }
    }
  }
}

/**
 * 强制转型
 * @param obj 源对象
 * @returns 具有目标类型的源对象
 */
function cast<T, U = unknown>(obj: U): T {
  return obj as unknown as T;
}

/**
 * 逻辑与
 * @param elements 元素列表
 * @param predicate 元素谓词
 * @returns {boolean} 列表中元素是否都满足谓词
 */
export function and<T = unknown>(
  elements: T[],
  predicate: (e: T) => boolean
): boolean {
  if (elements.length > 0) {
    const [head, ...tail] = elements;
    return predicate(head) && and(tail, predicate);
  } else {
    return true;
  }
}

/**
 * 逻辑或
 * @param elements 元素列表
 * @param predicate 元素谓词
 * @returns {boolean} 列表中元素是否有一项满足谓词
 */
export function or<T = unknown>(
  elements: T[],
  predicate: (e: T) => boolean
): boolean {
  if (elements.length > 0) {
    const [head, ...tail] = elements;
    return predicate(head) || or(tail, predicate);
  } else {
    return false;
  }
}
