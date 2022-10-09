import { Value } from '../types';

export function lockBackGesture(): void {
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler('lockBackGesture');
  }
}

export function unlockBackGesture(): void {
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler('unlockBackGesture');
  }
}

export async function isGestureLocked(): Promise<boolean> {
  return !window.WebViewJavascriptBridge
    ? false
    : new Promise((resolve) => {
        window.WebViewJavascriptBridge?.callHandler<unknown, Value<boolean>>(
          'isGestureLocked',
          undefined,
          (result) => {
            resolve(result.value);
          }
        );
      });
}
