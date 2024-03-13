import request from 'src/request';
import { FetchWarrantParams, parseWarrantTableString } from './models';

export async function fetchWarrant(
  params: FetchWarrantParams
): Promise<unknown[]> {
  const response = await request.get<string>('/tc/ajax/warrant-search-result', {
    params: {
      action: '',
      page: 1,
      num: 20,
      sort: '',
      order: '',
      visible: '',
      btnClass: 'more',
      product: 'all',
      issuer: '',
      ucode: '',
      ucode_m: '',
      wtype: 'ALL',
      strike1: '',
      strike2: '',
      tm1: '',
      tm2: '',
      egear1: '',
      egear2: '',
      premium1: '',
      premium2: '',
      iv1: '',
      iv2: '',
      cratio1: '',
      cratio2: '',
      ...params,
      _: Date.now(),
    } as FetchWarrantParams,
  });

  return parseWarrantTableString(response.data) ?? [];
}
