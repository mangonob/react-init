/* eslint-disable unicorn/filename-case */
import loadable from '@loadable/component';
import { ConfigProvider } from 'antd';
import React, { ComponentClass, ComponentProps } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';

import './App.css';
import { cast } from './components/flow-chart/utils';

export interface MicroAppProps {
  container: Element;
  name: string;
}
export interface AppProps<
  Page extends ComponentClass<unknown> = ComponentClass<unknown>
> extends Partial<MicroAppProps> {
  page: string;
  pageProps?: ComponentProps<Page>;
}

export default function App<Page extends ComponentClass<unknown>>(
  props: AppProps<Page>
) {
  const { page, pageProps } = props;

  const Comp = loadable<ComponentProps<Page>>(() =>
    cast(import(`src/pages/${page}`))
  );

  return (
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/first' : '/'}>
      <ConfigProvider
        getPopupContainer={() => {
          return document.querySelector('#root') || document.body;
        }}
      >
        <Provider store={store}>
          <Comp {...cast(pageProps)} />
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
