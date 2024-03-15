/**
 * @description DisposeBag
 * @author 高炼
 */

export interface Disposable {
  dispose: () => void;
}

export interface DisposeBag extends Disposable {
  disposed: (d: Disposable) => void;
  disposedBlock: (fn: () => void) => void;
  disposedBlocks: (...fns: (() => void)[]) => void;
}

export function createDisposeBag(): DisposeBag {
  const disposes: Disposable[] = [];

  return {
    dispose() {
      // eslint-disable-next-line unicorn/no-array-for-each
      disposes.forEach((d) => d.dispose());
      disposes.length = 0;
    },
    disposed(d: Disposable) {
      disposes.push(d);
    },
    disposedBlock(fn: () => void) {
      disposes.push({
        dispose() {
          fn();
        },
      });
    },
    disposedBlocks(...fns: (() => void)[]) {
      // eslint-disable-next-line unicorn/no-array-for-each
      fns.forEach((fn) => {
        disposes.push({
          dispose() {
            fn();
          },
        });
      });
    },
  };
}
