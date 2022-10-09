/**
 * @description 获取设备信息
 * @author 高炼
 */

import { setupWebViewJavascriptBridge } from '../setup';

export type DeviceType = 'phone' | 'pad' | 'unknow';
export type Platform = 'iOS' | 'Android' | 'HarmonyOS' | 'Windows' | 'unknow';

export interface DeviceInfo {
  /// 平台类型 (iOS)
  platform: Platform;

  /// 设备唯一标识，应用卸载后不更改
  deviceCode: string;

  /// 应用唯一标识符，应用卸载重装后发生更改
  appUniqueIdentifier: string;

  /// 应用包名
  packageIdentifier: string;

  /// 设备类型
  deviceType: DeviceType;

  /// 设备型号
  deviceModel?: string;

  /// 设备名称
  deviceName?: string;

  /// 系统版本
  osVersion: string;

  /// 应用版本
  appVersion: string;

  /// 国际化编码
  language: string;
}

/**
 * 获取Native设备信息
 */
export async function getDeviceInfo(): Promise<DeviceInfo | void> {
  return new Promise((resolve) => {
    setupWebViewJavascriptBridge((bridge) => {
      if (bridge) {
        bridge.callHandler<unknown, DeviceInfo>(
          'getDeviceInfo',
          undefined,
          (result) => {
            resolve(result);
          }
        );
      } else {
        resolve();
      }
    });
  });
}
