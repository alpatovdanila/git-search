import React from "react";
import ReactDOM from "react-dom";

import {App} from "@/features/application/components/app";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
