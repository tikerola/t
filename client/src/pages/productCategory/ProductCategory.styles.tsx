import styled from "styled-components";

export const Title = styled.h1`
  margin-top: 15px;
  text-align: center;
  color: ${(props) => props.theme.titleColor};
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
