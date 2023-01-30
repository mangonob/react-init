import { Button } from 'antd';
import React from 'react';
import { navigationTo } from 'runner-bridge';

export function Navigate() {
  return (
    <Button
      onClick={() => {
        navigationTo({
          url: '/welcome',
          param: {
            routerParams: '',
            titleBar: {
              title: 'Some',
              subTitle: 'subtitle',
            },
          },
        });
      }}
    >
      Navigate
    </Button>
  );
}
