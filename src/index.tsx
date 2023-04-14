import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App, { AppProps } from './App';

if (!window.__POWERED_BY_QIANKUN__) {
  ReactDOM.render(
    <App page="posts/post-list" />,
    document.querySelector('#root')
  );
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(): Promise<void> {
  return Promise.resolve().then(() => {
    console.log('react app bootstraped');
  });
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: AppProps): Promise<void> {
  console.info('mount with props', props);

  return Promise.resolve().then(() => {
    ReactDOM.render(
      <App {...props} />,
      props.container
        ? props.container.querySelector('#root')
        : document.querySelector('#root')
    );
  });
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: AppProps): Promise<void> {
  return Promise.resolve().then(() => {
    const node = props.container
      ? props.container.querySelector('#root')
      : document.querySelector('#root');

    node && ReactDOM.unmountComponentAtNode(node);
  });
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: AppProps): Promise<void> {
  return Promise.resolve().then(() => {
    console.log('update props', props);
  });
}
