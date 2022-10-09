/**
 * @description 梆梆安全-安全键盘
 * @author 高炼
 */

import { setupWebViewJavascriptBridge } from '../../setup';
import { BangcleSafeKeyboardMessagener } from './messager';

/** 键盘类型 */
export enum KeyboardType {
  verbose,
  number,
  identifierNumber,
  letter,
}

/// 加密算法
export enum EncyptoAlgorithm {
  rsa,
  aes,
  sm2,
}

/// 键盘外观
export enum KeyboardAppearence {
  light,
  dark,
}

export interface BangcleSafeKeyBoardParams {
  /// 输入初始值
  initialValue?: string;

  /// 输入框最大长度
  maxLength?: number;

  /// 删除按钮的最小长按键哥，默认0.6s
  minimumPressDuration?: number;

  /// 安全键盘 (default: verbose)
  keyboardType?: KeyboardType;

  /// 键盘外观 (default: light)
  appearence?: KeyboardAppearence;

  /// 按钮内容是否随机化
  isRandom?: boolean;

  /// 右上角按钮是否隐藏（default: false）
  isPackUpViewHidden?: boolean;

  /// 顶部分割线是否隐藏 (default: false)
  isTopLineHidden?: boolean;

  /// 点击“完成”后是否隐藏键盘 (default: true)
  isHiddenAfterDone?: boolean;

  /// 屏蔽按钮输入
  filters?: string[];
}

/**
 * 弹出安全键盘
 * @returns 键盘收起时，Promise会返回null
 */
export async function showSafeKeyboard(
  params?: BangcleSafeKeyBoardParams
): Promise<void> {
  if (window.WebViewJavascriptBridge) {
    return new Promise((resolve) => {
      window.WebViewJavascriptBridge?.callHandler(
        'showSafeKeyboard',
        params,
        () => {
          resolve();
        }
      );
    });
  }
}

/**
 * 隐藏安全键盘
 */
export function dismissSafeKeyboard(): void {
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler('dismissSafeKeyboard');
  }
}

/**
 * 清空用户输入时需要调用此方法，通知键盘同步清空状态
 */
export function clearSafeKeyboardInput(): void {
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler('safeKeyClearContent');
  }
}

/**
 * 安全键盘插件
 */
const BangcleSafeKeyBoardPlugin = {
  install() {
    setupWebViewJavascriptBridge((bridge) => {
      bridge?.registerHandler<{ value: number }>(
        'bangcleSafeKeyboardKeyDown',
        (info) => {
          BangcleSafeKeyboardMessagener.post({
            type: 'keydown',
            value: info.value,
          });
        }
      );
    });
  },
};

export default BangcleSafeKeyBoardPlugin;
