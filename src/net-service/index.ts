/**
 * @description 网络服务
 * @author 高炼
 */

import { Result } from './result';
import { Agent } from 'node:http';

export interface NetServiceConfig {
  /** 请求头 */
  headers?: Record<string, string>;
  /** 网络超时(default: 60_000 一分钟) */
  timeout?: number;
  /** 下载进度 */
  onDownload?: (progress: number) => void;
  /** 上传进度 */
  onUpload?: (progress: number) => void;
  /** 请求认证方式 */
  credential?: Credentials;
  /** HTTP代理 */
  httpAgent?: Agent;
  /** HTTPS代理 */
  httpsAgent?: Agent;
  /** 请求URL */
  url?: string;
  /** 基础URL，用于公用配置 */
  baseURL?: string;
}

/** 请求认证 */
export interface Credentials {
  username: string;
  password: string;
}

export interface NetServiceRequestConfig<D = unknown> extends NetServiceConfig {
  cancelable?: () => void;
  /** 请求参数 */
  data?: D;
}

export interface NetServicePlugin {
  onRequest?(): void;
  onResponse?(): void;
}

export interface NetServiceTransfromer<D, Resp1, Resp2, E1, E2> {
  prepareConfig(config: NetServiceRequestConfig<D>): NetServiceRequestConfig<D>;

  onError(source: E1): E2;

  onResponse(source: Resp1): Resp2;
}

export interface NetService<
  D,
  Resp,
  E,
  Plugins extends Record<string, NetServicePlugin> = Record<string, never>
> {
  post(config: NetServiceRequestConfig<D>): Promise<Result<Resp, E>>;

  get(config: NetServiceRequestConfig<D>): Promise<Result<Resp, E>>;

  transform<Resp2 = Resp, E2 = E>(
    transformer: (_: Resp) => Resp2
  ): NetService<D, Resp2, E2, Plugins>;

  pluginWith<N extends string, P extends NetServicePlugin>(
    name: N,
    plugin: P
  ): NetService<D, Resp, E, Plugins & Record<N, P>>;

  plugins(): Plugins;
}
