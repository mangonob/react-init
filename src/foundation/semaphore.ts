export interface Semaphore {
  lock: () => Promise<void>;
  unlock: () => void;
}

export function createSemaphore(count: number): Semaphore {
  const state = { count };
  const revoke: (() => void)[] = [];

  return {
    lock: async () => {
      if (state.count > 0) {
        state.count -= 1;
      } else {
        return new Promise((resolve) => {
          revoke.push(() => {
            state.count -= 1;
            resolve();
          });
        });
      }
    },
    unlock: () => {
      state.count += 1;
      revoke.shift()?.();
    },
  };
}
