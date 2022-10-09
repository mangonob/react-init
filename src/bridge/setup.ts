import { BridgeCallback } from '.';

/**
 * Setup WebViewJavascriptBridge
 * @param callback
 * @returns
 */
export function setupWebViewJavascriptBridge(
  callback: BridgeCallback
): unknown {
  if (/jsBridge/.test(navigator.userAgent)) {
    if (/android/i.test(navigator.userAgent)) {
      return setupWebViewJavascriptBridgeAndroid(callback);
    } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
      return setupWebViewJavascriptBridgeIOS(callback);
    }
  } else {
    return callback();
  }
}

function setupWebViewJavascriptBridgeAndroid(
  callback: BridgeCallback
): unknown {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        if (window.WebViewJavascriptBridge) {
          return callback(window.WebViewJavascriptBridge);
        }
      },
      false
    );
  }
}

function setupWebViewJavascriptBridgeIOS(callback: BridgeCallback): unknown {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }

  window.WVJBCallbacks = [callback];

  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.append(WVJBIframe);

  setTimeout(function () {
    WVJBIframe.remove();
  }, 0);
}
