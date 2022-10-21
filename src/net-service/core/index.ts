/**
 * @description 网络服务核心功能
 * @author 高炼
 */

import axios from 'axios';
import { NetService, NetServiceConfig, NetServicePlugin } from '..';

export function createNetworkService<D = unknown, Resp = unknown, E = Error>(
  config: NetServiceConfig
): NetService<D, Resp, E, []> {
  config;
  return undefined as unknown as NetService<D, Resp, E, []>;
}

interface Plugin1 extends NetServicePlugin {
  plugin1?: string;
}
interface Plugin2 extends NetServicePlugin {
  plugin2?: string;
}

async function foo() {
  const plugin1: Plugin1 = {};
  const plugin2: Plugin2 = {};
  axios.interceptors.request.use({});

  const networkServices = createNetworkService<string>({})
    .transform<number>()
    .pluginWith(plugin1)
    .pluginWith(plugin2);

  const [p1, p2] = networkServices.plugins();
  const ss = await networkServices.post({
    data: '',
  });
}
