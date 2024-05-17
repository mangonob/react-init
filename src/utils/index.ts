export * from './statistics';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ignore<T>(_: T): void {}

export function whenOr<T, P>(when: P, left: T, right: T): T {
  return when ? left : right;
}
