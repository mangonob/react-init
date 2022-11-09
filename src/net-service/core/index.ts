/**
 * @description 网络服务核心功能
 * @author 高炼
 */

import axios, {
  AxiosProxyConfig,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';
import { NetService, NetServiceConfig, NetServicePlugin } from '..';

export function createNetworkService<
  D = unknown,
  Resp = AxiosResponse,
  E = Error
>(config: NetServiceConfig): NetService<D, Resp, E> {
  const _plugins: Record<string, NetServicePlugin> = {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const _axisInstance = axios.create(convertConfigToAxisDefaults(config));

  const service: NetService<D, Resp, E> = {
    post() {
      return cast(void 0);
    },
    get() {
      return cast(void 0);
    },
    transform(transfromer) {
      return cast(void 0);
    },
    pluginWith(name, plugin) {
      // _plugins[name] = plugin;
      return cast(service);
    },
    plugins() {
      return cast(_plugins);
    },
  };

  return service;
}

function convertConfigToAxisDefaults(
  config: NetServiceConfig
): CreateAxiosDefaults {
  const {
    headers,
    timeout,
    onDownload,
    onUpload,
    credential,
    httpAgent,
    httpsAgent,
    url,
    baseURL,
    ...rest
  } = config;

  return {
    headers,
    timeout,
    onDownloadProgress(e) {
      // TODO
    },
    onUploadProgress: (e) => {
      // TODO
    },
    withCredentials: credential !== void 0,
    httpAgent,
    httpsAgent,
    url,
    baseURL,
    ...rest,
  };
}

// TODO example code
interface Plugin1 extends NetServicePlugin {
  plugin1?: string;
}
interface Plugin2 extends NetServicePlugin {
  plugin2?: string;
}

async function foo() {
  const plugin1: Plugin1 = {};
  const plugin2: Plugin2 = {};

  const networkServices = createNetworkService<string>({})
    .transform(() => 42)
    .pluginWith('askjdf', plugin1)
    .pluginWith('ajsklflj', plugin2);

  const ss = await networkServices.post({
    data: '',
  });
}

function cast<T, U = unknown>(obj: U): T {
  return obj as unknown as T;
}
