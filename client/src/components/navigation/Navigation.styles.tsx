import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavigationContainer = styled.div`
  height: ${(props) => props.theme.navigation.height};
  background-color: ${(props) => props.theme.navigation.primaryColor};
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: ${(props) => props.theme.navigation.height};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 3;
  }
`;

export const ImageContainer = styled(NavLink)`
  width: 40px;
  margin-left: 30px;
  margin-right: 100px;

  @media (max-width: ${({ theme }) => theme.smallPad}) {
    display: none;
  }
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

  @media (max-width: ${({ theme }) => theme.smallPad}) {
    display: none;
  }
`;
