export type Subscriber<E> = (event: E) => void;

export interface Observable<E> {
  subscribe: (listener: Subscriber<E>) => () => void;
  dispatch: (e: E) => void;
}

export function createObserver<E = unknown>(): Observable<E> {
  const subscribes = new Set<Subscriber<E>>();

  return {
    subscribe(sub) {
      subscribes.add(sub);
      return () => subscribes.delete(sub);
    },
    dispatch(e) {
      for (const sub of subscribes) sub(e);
    },
  };
}
