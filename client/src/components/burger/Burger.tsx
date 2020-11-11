import React from "react";
import { BurgerMenuContext } from "../../App";
import { StyledBurger } from "./Burger.styles";

export const Burger = () => {
  const { open, setOpen } = React.useContext(BurgerMenuContext);

  if (setOpen === undefined) return null;

  return (
    <StyledBurger open={open} onClick={() => setOpen((prev) => !prev)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};
