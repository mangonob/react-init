/**
 * 预览PDF
 */

export interface PDFPrewviewParams {
  /** PDF文档URL */
  url?: string;

  /** 文档标题 */
  title?: string;
}

export function prewviewPDF(params: PDFPrewviewParams): void {
  window.WebViewJavascriptBridge?.callHandler('previewPDF', params);
}
