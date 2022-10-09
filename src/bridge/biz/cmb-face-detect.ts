/**
 * @description 招商银行-人脸识别
 * @author 高炼
 */

export enum CMBFaceDetectStatus {
  /// 识别成功
  success = '200',
  /// 授权失败
  liscenseFailure = '201',
  /// 用户取消
  cancel = '707',
  /// 识别超时
  timeout = '708',
}

export interface CMBFaceDetectResult {
  status?: CMBFaceDetectStatus;
  userimage?: string;
  message?: string;
}

export enum CMBFaceDetectMotion {
  // faceCheckDefault = 1000,
  faceEyeBlink = 1001,
  faceMouthOpen,
  faceCheckDone,
}

export interface CMBFaceDetectParams {
  motions?: CMBFaceDetectMotion[];
  /// 是否对Motions进行随机化
  isRandom?: boolean;
}

/**
 * @param input 面部识别插件参数
 * @returns
 */
export async function startFaceDetect(
  params?: CMBFaceDetectParams
): Promise<CMBFaceDetectResult | undefined> {
  if (window.WebViewJavascriptBridge) {
    return new Promise((resolve) => {
      window.WebViewJavascriptBridge?.callHandler<
        CMBFaceDetectParams,
        CMBFaceDetectResult
      >('startFaceDetect', params, (result) => {
        resolve(result);
      });
    });
  }
}
