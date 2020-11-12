import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";
import { Router } from "react-router-dom";

import { createMemoryHistory } from "history";

const history = createMemoryHistory();
const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router history={history}>{children}</Router>
    </ThemeProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
