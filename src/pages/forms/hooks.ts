import { useEffect, useState } from 'react';

import { Application, Loadable } from './models';

export function useApplication(): Loadable<Application> {
  const [value, setValue] = useState<Loadable<Application>>({
    type: 'pending',
  });

  useEffect(() => {
    setValue({ type: 'loading' });
    setTimeout(() => {
      setValue({
        type: 'fulfilled',
        data: {
          name: 'Tom',
          sex: true,
          position: '湖北',
          address: '武汉市江夏区',
          job: '职工',
          annualIncome: '-',
          phoneNo: '188888886666',
          email: 'example@gmail.com',
          partners: [],
        },
      });
    }, 500);
  }, []);

  return value;
}
