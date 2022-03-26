import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import("./pages/home").then(({ default: Home }) => {
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    document.querySelector("#root")
  );
});
