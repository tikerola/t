import styled from "styled-components";

type MenuProps = {
  open: boolean;
};

export const StyledMenu = styled.nav<MenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.navigation.menuBgColor};
  height: 100vh;
  text-align: left;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: ${({ theme }) => theme.smallPad}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryColor};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.smallPad}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.secondaryColor};
    }
  }
`;
