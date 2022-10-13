import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import { store } from "./Components/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { fetchPosts } from "./Features/posts/PostSlice";

import { fetchUsers } from "./Features/users/UserSlice";
////dispatching our users and the posts directly to the store
store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
