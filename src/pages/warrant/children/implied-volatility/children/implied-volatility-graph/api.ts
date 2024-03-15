import request from 'src/request';
import { ImpliedVolatilityFetchResult } from './models';

export async function fetchImpliedVolatilityData(
  assetId: string
): Promise<ImpliedVolatilityFetchResult> {
  const response = await request.get<ImpliedVolatilityFetchResult>('/', {
    params: {
      q: `/tc/data/chart/ivchangeChart/code/${assetId}`,
    },
  });

  return response.data;
}
