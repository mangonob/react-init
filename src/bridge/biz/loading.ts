/**
 * @description Loading插件
 * @author 高炼
 */

export interface LoadingParams {
  /** 消息文案 */
  message?: string;

  /** 自定义配置（预留） */
  config?: LoadingConfig;
}

export type LoadinType = 'success' | 'info' | 'warning' | 'danger' | 'loading';

export interface LoadingConfig {
  duration?: number;
}

/**
 * 自定义Loading
 * @param type Loading类型
 * @param params Loading内容参数
 */
export function show(type: LoadinType, params: LoadingParams): void {
  let handlerName: string | undefined;

  switch (type) {
    case 'success':
      handlerName = 'showSuccess';
      break;
    case 'info':
      handlerName = 'showInfo';
      break;
    case 'warning':
      handlerName = 'showWarning';
      break;
    case 'danger':
      handlerName = 'showError';
      break;
    case 'loading':
      handlerName = 'showLoading';
      break;
  }

  window.WebViewJavascriptBridge?.callHandler(handlerName, params);
}

/**
 * 隐藏Loading
 */
export function dismissLoading(): void {
  window.WebViewJavascriptBridge?.callHandler('dismissLoading');
}

/**
 * 成功提示
 * @param message 消息文案
 */
export function showSuccess(message?: string): void {
  show('success', { message });
}

/**
 * 消息提示
 * @param message 消息文案
 */
export function showInfo(message?: string): void {
  show('info', { message });
}

/**
 * 警告提示
 * @param message 消息文案
 */
export function showWarning(message?: string): void {
  show('warning', { message });
}

/**
 * 错误提示
 * @param message 消息文案
 */
export function showError(message?: string): void {
  show('danger', { message });
}

/**
 * 加载中
 * @param message 消息文案
 */
export function showLoading(message?: string): void {
  show('loading', { message: message ?? '加载中...' });
}
