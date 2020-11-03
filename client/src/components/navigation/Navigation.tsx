import React from "react";
import Logo from "../../assets/iceberg.svg";
import {
  ImageContainer,
  NavigationContainer,
  NavigationLinks,
} from "./Navigation.styles";

export const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer>
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
