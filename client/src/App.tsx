import React, {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RoutesContainer } from "./App.styles";
import { Menu } from "./components/menu/Menu";
import { Navigation } from "./components/navigation/Navigation";
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
        <Menu open={open} setOpen={setOpen} />
        <BurgerMenuContext.Provider value={{ open, setOpen }}>
          <Navigation />
        </BurgerMenuContext.Provider>
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
      </Router>
    </>
  );
};
