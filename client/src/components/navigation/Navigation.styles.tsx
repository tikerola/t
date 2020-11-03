import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavigationContainer = styled.div`
  height: ${(props) => props.theme.navigation.height};
  background-color: ${(props) => props.theme.navigation.primaryColor};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ImageContainer = styled(NavLink)`
  width: 50px;
  margin-left: 10px;
  margin-right: 100px;
`;

export const NavigationLinks = styled(NavLink)`
  color: ${(props) => props.theme.navigation.secondaryColor};
  margin-right: 20px;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: #fff;
  }

  &.activeElementStyle {
    color: #777;
    font-size: 1.1rem;
    transition: color 0.65s ease-out;
  }
`;
