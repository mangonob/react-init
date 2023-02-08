import React, { useEffect } from 'react';
import { exit } from 'runner-bridge';

export function MessageChannel() {
  useEffect(() => {
    const exitTask = setTimeout(() => {
      exit(1);
    }, 3000);

    return () => {
      clearTimeout(exitTask);
    };
  });
  return <h1>Message Channel</h1>;
}
