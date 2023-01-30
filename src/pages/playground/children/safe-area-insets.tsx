import React, { useEffect, useState } from 'react';
import { ColorMode, NativeBindings } from 'runner-bridge';

export function SafeAreaInsetsDemo() {
  const [colorMode, setColorMode] = useState<ColorMode>(ColorMode.light);

  useEffect(() => {
    NativeBindings.instance().getColorMode().then(setColorMode);
    return NativeBindings.instance().listenColorMode(setColorMode).cancel;
  }, []);

  return <div>ColorMode: {colorMode}</div>;
}
