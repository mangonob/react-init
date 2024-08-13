import { ReactNode } from 'react';

export interface FormError<T = unknown> {
  errorFields: {
    name: unknown;
    errors: (ReactNode | Error)[];
    warnings: (ReactNode | Error)[];
  }[];
  outOfDate: boolean;
  values: T;
}
