/**
 * Exit with code
 * @param code Error code
 */
export function exit(code: number) {
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler('exit', code);
  }
}

export type Scene = 'launch';

/**
 * Send scene load event to native runner
 * @param scene Business scene
 */
export function onSceneLoaded(scene: Scene) {
  if (window.WebViewJavascriptBridge) {
    window.WebViewJavascriptBridge.callHandler('onSceneLoaded', scene);
  }
}
