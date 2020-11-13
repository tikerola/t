import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BurgerMenuContext } from "../../App";
import { StyledMenu } from "./Menu.styles";

export const Menu = (): JSX.Element | null => {
  const { open, setOpen } = useContext(BurgerMenuContext);

  if (setOpen === undefined || open === undefined) return null;

  return (
    <StyledMenu open={open}>
      <Link to="/" onClick={() => setOpen((prev) => !prev)}>
        Home
      </Link>
      <Link to="/jackets" onClick={() => setOpen((prev) => !prev)}>
        Jackets
      </Link>
      <Link to="/shirts" onClick={() => setOpen((prev) => !prev)}>
        Shirts
      </Link>
      <Link to="/accessories" onClick={() => setOpen((prev) => !prev)}>
        Accessories
      </Link>
    </StyledMenu>
  );
};
