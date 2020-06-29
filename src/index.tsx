import React from "react";
import ReactDOM from "react-dom";
import './styles/global-styles.scss';
import {App} from "@/features/application/components/app";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
