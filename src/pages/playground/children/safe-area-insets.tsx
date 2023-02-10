import React from 'react';
import { useSafeAreaInsets } from '..';

export function SafeAreaInsetsDemo() {
  const insets = useSafeAreaInsets();

  return (
    <div>
      SafeAreaInsets: <p>{JSON.stringify(insets)}</p>
    </div>
  );
}
