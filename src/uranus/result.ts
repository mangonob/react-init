export type Result<T, E> =
  | {
      type: 'success';
      value: T;
    }
  | {
      type: 'failure';
      error: E;
    };
