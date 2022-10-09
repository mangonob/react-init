/**
 * @description WebViewJavascriptBridge utils
 * @author 高炼
 */

export function ensureObject<T>(value: unknown): T {
  if (typeof value == 'string') {
    try {
      return cast(JSON.parse(value));
    } catch {
      return cast(value);
    }
  } else {
    return cast(value);
  }
}

/** 强制类型转换 */
function cast<T>(obj: unknown): T {
  return obj as T;
}
