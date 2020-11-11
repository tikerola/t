import React, { Dispatch, SetStateAction } from "react";
import { StyledMenu } from "./Menu.styles";
import { Link } from "react-router-dom";

type IProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Menu = ({ open, setOpen }: IProps): JSX.Element => {
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
