import request from 'src/request';
import { ImpliedVolatilityFetchResult } from './models';
import { createSemaphore } from 'src/foundation';

const semaphore = createSemaphore(3);

export async function fetchImpliedVolatilityData(
  assetId: string
): Promise<ImpliedVolatilityFetchResult> {
  await semaphore.lock();
  const response = await request
    .get<ImpliedVolatilityFetchResult>('/', {
      params: {
        q: `/tc/data/chart/ivchangeChart/code/${assetId}`,
      },
    })
    .finally(() => semaphore.unlock());

  return response.data;
}
