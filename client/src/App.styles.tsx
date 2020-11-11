import styled from "styled-components";

export const RoutesContainer = styled.div`
  margin: 0;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-top: calc(${({ theme }) => theme.navigation.height} + 20px);
  }
`;
