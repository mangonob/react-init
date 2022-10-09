export interface ImagePickerParams {
  /** 最大可选图片数量 */
  maxCount: number;

  /** 最少必选图片数量 */
  minCount: number;
}

export interface ImageEntry {
  base64: string;
  extension: string;
}

export interface ImagePickerResult {
  /** 所选图片的Base64 */
  images: ImageEntry[];
}

/**
 * 弹出图片选择器
 * @param params 图片选择器配置
 * @returns
 */
export async function showImagePicker(
  params?: ImagePickerParams
): Promise<ImagePickerResult | undefined> {
  if (window.WebViewJavascriptBridge) {
    return new Promise((resolve) => {
      window.WebViewJavascriptBridge?.callHandler<
        ImagePickerParams,
        ImagePickerResult
      >('showImagePicker', params, (result) => {
        resolve(result);
      });
    });
  }
}
