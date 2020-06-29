import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import { App } from "@/features/application/components/app";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
