import React from "react";
import ReactDOM from "react-dom";

import("./pages/home").then(({ default: Home }) => {
  ReactDOM.render(<Home />, document.querySelector("#root"));
});
