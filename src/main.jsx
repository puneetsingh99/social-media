import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./custom-styles.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";
import { fetchAllUsers } from "./features/users/usersSlice";

console.log("MAIN.JSX fetch all users...");
store.dispatch(fetchAllUsers());
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
