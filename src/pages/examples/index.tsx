import { Button } from 'antd';
import React, { useMemo, useState } from 'react';
import { useLogger } from 'src/hooks';

export default function Examples() {
  const getRandom = () => Math.random().toString(16).slice(-8);
  const [a, setA] = useState(getRandom());
  const [b, setB] = useState(getRandom());
  const v = useMemo(() => {
    return {
      a,
      b,
    };
  }, [a, b]);

  useLogger(v, 'object');

  return (
    <div>
      <h1>Examples</h1>
      <Button
        onClick={() => {
          setA(getRandom());
          setB(getRandom());
        }}
      >
        Button
      </Button>
    </div>
  );
}
