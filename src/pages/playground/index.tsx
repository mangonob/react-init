import { Collapse } from 'antd';
import React, { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { NativeBindings, SafeAreaInsets } from 'runner-bridge';
import { AppCache } from './children/app-cache';
import { Navigate } from './children/navigate';
import { SafeAreaInsetsDemo } from './children/safe-area-insets';
import { StatusBar } from './children/status-bar';
import { PDFPreview } from './children/pdf-preview';

const { Panel } = Collapse;

export default function Playground() {
  const { left, right, top, bottom } = useSafeAreaInsets();
  const [active = 'navigate', setActive] = useLocalStorage<string>(
    'local:playground:active'
  );

  setTimeout(() => {
    console.info(left, right, top, bottom);
  }, 1000);

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
      <Panel header="PDFPreview" key="pdf-preview">
        <PDFPreview />
      </Panel>
      <Panel header="StatusBar" key="status-bar">
        <StatusBar />
      </Panel>
      <Panel header="AppCache" key="app-cache">
        <AppCache />
      </Panel>
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
  const zeroInsets = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  const [safeAreaInsets = zeroInsets, setSafeAreaInsets] =
    useLocalStorage<SafeAreaInsets>('local:safe-area-insets');

  useEffect(() => {
    NativeBindings.instance().getSafeAreaInsets().then(setSafeAreaInsets);
    return NativeBindings.instance().listenSafeAreaInsets(setSafeAreaInsets)
      .cancel;
  }, [setSafeAreaInsets]);

  return safeAreaInsets;
}
