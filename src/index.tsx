import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.scss";
import "./assets/styles/variables.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { fetchCurrentUser, userApiSlice } from "./features/auth/userSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

store.dispatch(userApiSlice.endpoints.getCurrentUser.initiate());
store.dispatch(fetchCurrentUser());

root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
