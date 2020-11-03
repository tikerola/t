import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { App } from "./App";
import { reducers } from "./store/reducers";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";
import "./index.css";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
