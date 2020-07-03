import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.scss";
import { App } from "@/app/components/app";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
