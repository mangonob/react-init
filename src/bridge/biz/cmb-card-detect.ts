/**
 * @description 招商银行-卡片识别
 * @author 高炼
 */

export enum CMBCardDetectCode {
  /// 识别成功
  success = '200',
  /// 用户取消
  cancel = '201',
}

export interface CMBCardDetectResult {
  message?: string;
  code?: CMBCardDetectCode;
  /// 仿射变换图
  image?: string;
  /// 原图
  imagesource: string;
}

export interface CMBCardDetectParams {
  /// 扫描延时（单位：秒）
  delay?: number;
  /// 是否横版
  isLandscape?: boolean;
}

export async function startCardDetect(
  params?: CMBCardDetectParams
): Promise<CMBCardDetectResult | undefined> {
  if (window.WebViewJavascriptBridge) {
    return new Promise((resolve) => {
      window.WebViewJavascriptBridge?.callHandler<
        CMBCardDetectParams,
        CMBCardDetectResult
      >('startCardDetect', params, (result) => {
        resolve(result);
      });
    });
  }
}
