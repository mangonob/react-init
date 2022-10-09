/**
 * @description WebViewJavascriptBridge
 * @author 高炼
 */

import { NativeBindingsPlugin } from './native-bindings';
import { setupWebViewJavascriptBridge } from './setup';
import { ensureObject } from './utils';

declare global {
  interface Window {
    /// Bridge instance
    WebViewJavascriptBridge?: IWebViewJavascriptBridge;
    /// WebViewJavascriptBridget Callback
    WVJBCallbacks?: [BridgeCallback];
  }
}

export interface ResponseCallback<R> {
  (parameters: R): void;
}

export interface WebViewJavascriptBridgeHandler<P, R> {
  (parameters: P, responseCallback: ResponseCallback<R>): void;
}

/**
 * interface of window.WebViewJavascriptBridge
 */
export interface IWebViewJavascriptBridge {
  registerHandler: <P = unknown, R = unknown>(
    handlerName: string,
    handler: WebViewJavascriptBridgeHandler<P, R>
  ) => void;

  callHandler: <P = unknown, R = unknown>(
    handlerName: string,
    parameters?: P,
    responseCallback?: ResponseCallback<R>
  ) => void;
}

export interface BridgeCallback {
  (_?: IWebViewJavascriptBridge): void;
}

const WebViewJavascriptBridgePlugin = {
  install() {
    setupWebViewJavascriptBridge((bridge) => {
      if (bridge) {
        const callHandler_ = bridge.callHandler;
        bridge.callHandler = (handleName, params, responseCallback) => {
          callHandler_(handleName, params, (result) => {
            if (responseCallback) {
              /// 安卓端返回的是字符串，需要转换成对象
              responseCallback(ensureObject(result));
            }
          });
        };

        const registerHandler_ = bridge.registerHandler;
        bridge.registerHandler = (handleName, handler) => {
          registerHandler_(handleName, (info, call) => {
            if (handler) {
              /// 安卓端返回的是字符串，需要转换成对象
              handler(ensureObject(info), call);
            }
          });
        };
      }
    });

    NativeBindingsPlugin.install();
  },
};

export default WebViewJavascriptBridgePlugin;
