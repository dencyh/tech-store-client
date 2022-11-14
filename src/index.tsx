import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/global.scss";
import App from "./App";
import { Provider } from "react-redux";
// import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
