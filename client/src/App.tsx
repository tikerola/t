import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/navigation/Navigation";
import { Accessories } from "./pages/accessories/Accessories";
import { Home } from "./pages/home/Home";
import { Jackets } from "./pages/jackets/Jackets";
import { Shirts } from "./pages/shirts/shirts";

export const App = (): JSX.Element => {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/jackets">
            <Jackets />
          </Route>
          <Route path="/shirts">
            <Shirts />
          </Route>
          <Route path="/accessories">
            <Accessories />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
