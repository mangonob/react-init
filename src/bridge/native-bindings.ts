/**
 * @description 原生特性绑定
 * @author 高炼
 */

import { setupWebViewJavascriptBridge } from './setup';
import { Value } from './types';

export interface Subscription {
  cancel(): void;
}

export type ValueCallback<T> = (value: T) => void;

export type NativeBindingsSlice =
  | 'colormode'
  | 'textscale'
  | 'reachability'
  | 'safeAreaInsets'
  | 'keyboardSize';

export enum ColorMode {
  dark,
  light,
  unknown,
}

export enum ReachabilityStatus {
  /** WiFi connected */
  wifi = 'WIFI',

  /** Cellular connected */
  cellular = 'CELLULAR',

  /** Network disconnected */
  unavailable = 'UNAVAILABLE',
}

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface Size {
  width: number;
  height: number;
}

export class NativeBindings {
  private static _instance = new NativeBindings();

  colorModeListeners: Array<ValueCallback<ColorMode>> = [];
  textScaleListeners: Array<ValueCallback<number>> = [];
  reachbilityListeners: Array<ValueCallback<ReachabilityStatus>> = [];
  safeAreaInsetsListeners: Array<ValueCallback<SafeAreaInsets>> = [];
  keyboardSizeListeners: Array<ValueCallback<Size | undefined>> = [];

  static instance(): NativeBindings {
    return NativeBindings._instance;
  }

  listenColorMode(callback: ValueCallback<ColorMode>): Subscription {
    this.colorModeListeners.push(callback);

    return {
      cancel: () => {
        this.colorModeListeners = this.colorModeListeners.filter(
          (c) => c != callback
        );
      },
    };
  }

  listenTextScale(callback: ValueCallback<number>): Subscription {
    this.textScaleListeners.push(callback);

    return {
      cancel: () => {
        this.textScaleListeners = this.textScaleListeners.filter(
          (c) => c != callback
        );
      },
    };
  }

  /**
   * Listen on reachability changed event.
   * @param callback
   * @returns Cancelable subcription
   * @example
   * ```typescript
   *  setup() {
   *    const reachabilityStatus = ref(ReachabilityStatus.unavailable);
   *
   *    const reachSubscription = ref<Subscription | undefined>(undefined);
   *    // 订阅及取消订阅
   *    onMounted(() => {
   *      // 获取初始值
   *      reachabilityStatus.value = await NativeBindings.instance().getReachbility();
   *      // 订阅连通性更新
   *      reachSubscription.value = NativeBindings.instance().listenReachability(
   *        (status) => (reachabilityStatus.value = status)
   *      );
   *    });
   *    onUnmounted(() => {
   *      reachSubscription.value?.cancel();
   *    });
   *
   *    return { reachbiltiyStatus };
   *  }
   * ```
   */
  listenReachability(
    callback: ValueCallback<ReachabilityStatus>
  ): Subscription {
    this.reachbilityListeners.push(callback);

    return {
      cancel: () => {
        this.reachbilityListeners = this.reachbilityListeners.filter(
          (c) => c != callback
        );
      },
    };
  }

  listenSafeAreaInsets(callback: ValueCallback<SafeAreaInsets>): Subscription {
    this.safeAreaInsetsListeners.push(callback);

    return {
      cancel: () => {
        this.safeAreaInsetsListeners = this.safeAreaInsetsListeners.filter(
          (c) => c != callback
        );
      },
    };
  }

  listenKeyboardSize(callback: ValueCallback<Size | undefined>): Subscription {
    this.keyboardSizeListeners.push(callback);

    return {
      cancel: () => {
        this.keyboardSizeListeners = this.keyboardSizeListeners.filter(
          (c) => c != callback
        );
      },
    };
  }

  notifyListener(on: NativeBindingsSlice, value: unknown): void {
    switch (on) {
      case 'colormode':
        this.colorModeListeners.forEach((callback) => {
          callback(value as ColorMode);
        });
        break;
      case 'textscale':
        this.textScaleListeners.forEach((callback) => {
          callback(value as number);
        });
        break;
      case 'reachability':
        this.reachbilityListeners.forEach((callback) => {
          callback(value as ReachabilityStatus);
        });
        break;
      case 'safeAreaInsets':
        this.safeAreaInsetsListeners.forEach((callback) => {
          callback(value as SafeAreaInsets);
        });
        break;
      case 'keyboardSize':
        this.keyboardSizeListeners.forEach((callback) => {
          callback(value as Size);
        });
        break;
    }
  }

  /**
   * @returns 当前系统主题设置（深色模式/浅色模式）
   */
  async getColorMode(): Promise<ColorMode> {
    return new Promise((resolve) => {
      setupWebViewJavascriptBridge((bridge) => {
        if (bridge) {
          bridge.callHandler<unknown, Value<ColorMode>>(
            'getColorMode',
            undefined,
            (info) => {
              resolve(info.value);
            }
          );
        } else {
          resolve(ColorMode.unknown);
        }
      });
    });
  }

  /**
   * @returns 当前系统字体缩放因子
   */
  async getTextScale(): Promise<number> {
    return new Promise((resolve) => {
      setupWebViewJavascriptBridge((bridge) => {
        if (bridge) {
          bridge.callHandler<unknown, Value<number>>(
            'getTextScale',
            undefined,
            (info) => {
              resolve(info.value);
            }
          );
        } else {
          resolve(1);
        }
      });
    });
  }

  /**
   * @returns 当前网络可达性
   */
  async getReachbility(): Promise<ReachabilityStatus> {
    return new Promise((resolve) => {
      setupWebViewJavascriptBridge((bridge) => {
        if (bridge) {
          bridge.callHandler<unknown, Value<ReachabilityStatus>>(
            'getReachability',
            undefined,
            (info) => {
              resolve(info.value);
            }
          );
        } else {
          resolve(ReachabilityStatus.wifi);
        }
      });
    });
  }
  async getSafeAreaInsets(): Promise<SafeAreaInsets> {
    return new Promise((resolve) => {
      setupWebViewJavascriptBridge((bridge) => {
        if (bridge) {
          bridge.callHandler<unknown, Value<SafeAreaInsets>>(
            'getSafeAreaInsets',
            undefined,
            (info) => {
              resolve(info.value);
            }
          );
        } else {
          resolve({
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          });
        }
      });
    });
  }
}

/**
 * 原生绑定插件，默认会在WebViewJavaScriptBridgePlugin中安装
 */
export const NativeBindingsPlugin = {
  install() {
    setupWebViewJavascriptBridge((bridge) => {
      if (bridge) {
        bridge.registerHandler<Value<ColorMode>>('updateColorMode', (info) => {
          NativeBindings.instance().notifyListener('colormode', info.value);
        });

        bridge.registerHandler<Value<number>>('updateTextScale', (info) => {
          NativeBindings.instance().notifyListener('textscale', info.value);
        });

        bridge.registerHandler<Value<number>>('updateReachability', (info) => {
          NativeBindings.instance().notifyListener('reachability', info.value);
        });

        bridge.registerHandler<Value<SafeAreaInsets>>(
          'updateSafeAreaInsets',
          (info) => {
            NativeBindings.instance().notifyListener(
              'safeAreaInsets',
              info.value
            );
          }
        );

        bridge.registerHandler<Value<Size | undefined>>(
          'updateKeyboardSize',
          (info) => {
            NativeBindings.instance().notifyListener(
              'keyboardSize',
              info.value
            );
          }
        );
      }
    });
  },
};
