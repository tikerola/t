import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RoutesContainer } from "./App.styles";
import { Navigation } from "./components/navigation/Navigation";
import { ScrollToTop } from "./components/scrollToTop/ScrollToTop";
import { Accessories } from "./pages/accessories/Accessories";
import { Home } from "./pages/home/Home";
import { Jackets } from "./pages/jackets/Jackets";
import { Shirts } from "./pages/shirts/Shirts";

type ContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const BurgerMenuContext = createContext<Partial<ContextType>>({});

export const App = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Router>
        <ScrollToTop />
        <BurgerMenuContext.Provider value={{ open, setOpen }}>
          <Navigation />
          <RoutesContainer>
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
          </RoutesContainer>
        </BurgerMenuContext.Provider>
      </Router>
    </>
  );
};
