import styled from "styled-components";

export const Title = styled.h1`
  margin-top: 10%;
  margin-bottom: 10px;
  padding-left: 15%;
  color: ${(props) => props.theme.titleColor};
  font-size: 2.5rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
`;

export const TextContainer = styled.div`
  margin-left: 100px;
  width: 25%;
`;

export const Text = styled.p`
  font-size: 1.4rem;
`;
