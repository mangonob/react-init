import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { installJSBridge } from 'runner-bridge';
import store from './store';

installJSBridge();

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
