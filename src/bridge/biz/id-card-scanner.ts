/// 身份证扫描类型（正面/反面）
export type IDCardScannerType = "front" | "back";

export interface IDCardScannerParams {
  /// 扫描开始时的 Toast 消息
  message?: string;

  /// 扫描类型（default: "front"）
  scannerType?: IDCardScannerType;
}

export async function startIDCardScanner(
  params?: IDCardScannerParams
): Promise<string | undefined> {
  if (window.WebViewJavascriptBridge) {
    return new Promise((resolve) => {
      window.WebViewJavascriptBridge?.callHandler<IDCardScannerParams, string>(
        "startIDCardScanner",
        params,
        (result) => {
          resolve(result);
        }
      );
    });
  }
}

export function finishIDCardScanner(): void {
  window.WebViewJavascriptBridge?.callHandler("finishIDCardScanner");
}
