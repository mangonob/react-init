export interface Application {
  name: string;
  sex: boolean;
  position: string;
  address: string;
  job: string;
  annualIncome: string;
  phoneNo: string;
  email: string;
  partners: Partner[];
}

export interface Partner {}

export type Loadable<T = unknown, E = Error> =
  | {
      type: 'pending';
    }
  | {
      type: 'loading';
    }
  | {
      type: 'fulfilled';
      data: T;
    }
  | {
      type: 'reject';
      error: E;
    };
