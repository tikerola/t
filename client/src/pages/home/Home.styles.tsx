import styled from "styled-components";

export const PageName = styled.h1`
  margin-top: 50px;
  margin-bottom: 10px;
  margin-left: 6%;
  color: ${(props) => props.theme.titleColor};
  font-size: 3rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
`;

export const Title = styled.h1`
  margin-top: 5%;
  margin-bottom: 10px;
  margin-left: 6%;
  color: ${(props) => props.theme.titleColor};
`;

export const TextContainer = styled.div`
  margin-left: 6%;
  width: 30%;

  @media (max-width: ${({ theme }) => theme.pad}) {
    width: 60%;
  }

  @media (max-width: ${({ theme }) => theme.smallPad}) {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 15px;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 80%;
  }
`;

export const Text = styled.p`
  font-size: 1.4rem;
`;
