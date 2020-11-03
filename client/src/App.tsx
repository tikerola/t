import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/navigation/Navigation";
import { Home } from "./pages/Home";
import { ProductCategory } from "./pages/productCategory/ProductCategory";

export const App = (): JSX.Element => {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/jackets">
            <ProductCategory title="Jackets" category="jackets" />
          </Route>
          <Route path="/shirts">
            <ProductCategory title="Shirts" category="shirts" />
          </Route>
          <Route path="/accessories">
            <ProductCategory title="Accessories" category="accessories" />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
