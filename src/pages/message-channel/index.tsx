import React, { useEffect } from 'react';

export function MessageChannel() {
  useEffect(() => {
    const exitTask = setTimeout(() => {
      console.info('nothing');
    }, 3000);

    return () => {
      clearTimeout(exitTask);
    };
  });
  return <h1>Message Channel</h1>;
}
