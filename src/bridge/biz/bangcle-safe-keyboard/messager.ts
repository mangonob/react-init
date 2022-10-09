interface Disposable {
  dispose(): void;
}

export type SafeKeyboardEventType = 'keydown';

export interface SafeKeyboardEvent {
  /**
   * 安全键盘事件类型
   * * keydown: 键盘输入
   */
  type: SafeKeyboardEventType;

  /** 事件绑定值 */
  value: unknown;
}

interface Observer {
  (event: SafeKeyboardEvent): void;
}

interface IBangcleSafeKeyboardMessagener {
  /** 事件生成 */
  post(event: SafeKeyboardEvent): void;

  /** 监听安全键盘事件 */
  listen(observer: Observer, on?: SafeKeyboardEventType): Disposable;
}

function createMessagener(): IBangcleSafeKeyboardMessagener {
  let observers: Array<[SafeKeyboardEventType | undefined, Observer]> = [];

  return {
    post(event) {
      observers.forEach(([eventType, observer]) => {
        if (event.type == eventType || !eventType) {
          observer(event);
        }
      });
    },
    listen(observer, on) {
      observers.push([on, observer]);

      return {
        dispose() {
          observers = observers.filter(([, o]) => o !== observer);
        },
      };
    },
  };
}

/** 安全键盘事件分发的全局对象 */
export const BangcleSafeKeyboardMessagener = createMessagener();
