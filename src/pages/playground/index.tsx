import { Button } from 'antd';
import React from 'react';

export default function Playground() {
  const foo = (start: number) => {
    if (Date.now() - start > 3000) {
      return;
    } else {
      queueMicrotask(() => foo(start));
    }
  };

  const bar = (start: number) => {
    if (Date.now() - start > 4000) {
      return;
    } else {
      setTimeout(() => bar(start));
    }
  };

  return (
    <h1>
      Playground
      <Button
        onClick={() => {
          foo(Date.now());
        }}
      >
        MicroTask
      </Button>
      <Button
        onClick={() => {
          bar(Date.now());
        }}
      >
        Task
      </Button>
    </h1>
  );
}
