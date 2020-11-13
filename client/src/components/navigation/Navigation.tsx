import React from "react";
import Logo from "../../assets/globe.svg";
import { Burger } from "../burger/Burger";
import { Menu } from "../menu/Menu";
import {
  ImageContainer,
  NavigationContainer,
  NavigationLinks,
} from "./Navigation.styles";

export const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Burger />
      <Menu />
      <ImageContainer to="/">
        <img src={Logo} alt="logo" />
      </ImageContainer>
      <NavigationLinks to="/jackets" activeClassName="activeElementStyle">
        Jackets
      </NavigationLinks>
      <NavigationLinks to="/shirts" activeClassName="activeElementStyle">
        Shirts
      </NavigationLinks>
      <NavigationLinks to="/accessories" activeClassName="activeElementStyle">
        Accessories
      </NavigationLinks>
    </NavigationContainer>
  );
};
