import styled from "styled-components";

export const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: center;
  color: ${(props) => props.theme.titleColor};
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-between;
  margin: 15px auto;
`;

export const Button = styled.div`
  background-color: ${(props) => props.theme.button.bgColor};
  width: 150px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &:hover {
    color: ${(props) => props.theme.button.bgHoverColor};
  }
`;

export const PageNumberText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
