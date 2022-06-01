import axios from 'axios';
import { Result } from './result';
import { Transformer } from './transformer';
import { Config } from './config';

export type Method =
  | 'get'
  | 'delete'
  | 'head'
  | 'options'
  | 'post'
  | 'put'
  | 'patch'
  | 'postForm'
  | 'putForm'
  | 'patchForm';

export class Uranus<P> {
  private axiosInstance = axios.create({});

  adapte<T>(adapter: Transformer<P, T>): Uranus<T> {
    return this as unknown as Uranus<T>;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async request<D = unknown>(
    method: Method,
    data?: D,
    config?: Config
  ): Promise<Result<P, Error>> {
    this.axiosInstance.request({
      method: method,
      params: data,
      data,
      ...config,
    });
    return { type: 'failure', error: new Error('error') };
  }
}
