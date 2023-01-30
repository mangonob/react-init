import { Collapse } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { NativeBindings, SafeAreaInsets } from 'runner-bridge';
import { Navigate } from './children/navigate';
import { SafeAreaInsetsDemo } from './children/safe-area-insets';

const { Panel } = Collapse;

export default function Playground() {
  const { left, right, top, bottom } = useSafeAreaInsets();
  const [active = 'navigate', setActive] = useLocalStorage<string>(
    'local:playground:active'
  );

  return (
    <Collapse
      defaultActiveKey={active}
      accordion
      style={{
        paddingLeft: left,
        paddingRight: right,
        paddingTop: top,
        paddingBottom: bottom,
      }}
      onChange={(k) => {
        if (typeof k === 'string') setActive(k);
      }}
    >
      <Panel header="Navigate" key="navigate">
        <Navigate />
      </Panel>
      <Panel header="SafeAreaInsets" key="safe-area-insets">
        <SafeAreaInsetsDemo />
      </Panel>
    </Collapse>
  );
}

export function useSafeAreaInsets(): SafeAreaInsets {
  const [safeAreaInsets, setSafeAreaInsets] = useState<SafeAreaInsets>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    NativeBindings.instance().getSafeAreaInsets().then(setSafeAreaInsets);
    return NativeBindings.instance().listenSafeAreaInsets(setSafeAreaInsets)
      .cancel;
  }, []);

  return safeAreaInsets;
}
