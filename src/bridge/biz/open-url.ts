export interface OpenUrlParams {
  /** 跳转的目标Url */
  url: string;
}

/** 跳转指定Url */
export function openUrl(params: OpenUrlParams): void {
  window.WebViewJavascriptBridge?.callHandler('openUrl', params);
}

/** 跳转应用设置页 */
export function openSetting(): void {
  window.WebViewJavascriptBridge?.callHandler('openSetting');
}

/** 判断URL是否可跳转 */
export async function canOpenUrl(params: OpenUrlParams): Promise<boolean> {
  if (window.WebViewJavascriptBridge) {
    return new Promise((resolve) => {
      window.WebViewJavascriptBridge?.callHandler<
        OpenUrlParams,
        { value: boolean }
      >('canOpenUrl', params, (result) => {
        resolve(result.value);
      });
    });
  }
  return false;
}
