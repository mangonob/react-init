/**
 * @description Flow Chart utilities
 * @author 高炼
 */

export type PickPartial<T, K extends keyof T> = Partial<Pick<T, K>>;
export type PickRequired<T, K extends keyof T> = Required<Pick<T, K>>;
export type OmitOf<T, K extends keyof T> = Omit<T, K>;

export function cast<T, U = unknown>(source: U): T {
  return source as unknown as T;
}

export function ignoreUnused<T>(obj: T) {
  obj;
}

export function when<T>(condition: boolean, value: T): T | undefined {
  return condition ? value : undefined;
}

export function unless<T>(condition: boolean, value: T): T | undefined {
  return condition ? undefined : value;
}
