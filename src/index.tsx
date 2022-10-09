import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import WebViewJavascriptBridgePlugin from './bridge';
import store from './store';

WebViewJavascriptBridgePlugin.install();

import('./App').then(({ default: App }) => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.querySelector('#root')
  );
});
