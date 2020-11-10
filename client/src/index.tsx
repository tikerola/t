import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import "./index.css";
import { lightTheme } from "./styles/theme";

ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
