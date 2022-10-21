/**
 * @description Result Monad
 * @author 高炼
 */

export type Result<T, E = unknown> =
  | {
      type: 'success';
      value: T;
    }
  | {
      type: 'failure';
      error: E;
    };
