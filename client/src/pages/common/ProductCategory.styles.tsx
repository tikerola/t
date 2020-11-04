import styled from "styled-components";

export const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 25%;
  color: ${(props) => props.theme.titleColor};
  font-size: 2.2rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CardName = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
  background-color: rgb(255, 255, 255, 0.5);
  padding: 5px;
`;

export const Manufacturer = styled.div`
  text-align: center;
  position: relative;
  top: 0px;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 15px;
`;

interface Props {
  price: number;
}

export const PriceTag = styled.div<Props>`
  width: 80px;
  height: 20px;
  background-color: ${(props) =>
    props.price < 30
      ? props.theme.tag.cheap
      : props.price < 60
      ? props.theme.tag.moderate
      : props.theme.tag.expensive};
  margin-top: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  transform: rotate(25deg);
  position: absolute;
  bottom: 0;
  left: -20px;
`;

export const ColorContainer = styled.div`
  text-align: center;
  color: #333;
`;

export const ColorButton = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`;

export const ButtonContainerBackground = styled.div`
  background-color: rgba(51, 51, 51, 0.8);
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-between;
  margin: 15px auto;
  border-radius: 0px;
`;

export const Button = styled.div`
  width: 150px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;

  &:hover {
    color: ${(props) => props.theme.button.bgHoverColor};
  }

  &:active {
    color: white;
  }
`;

export const PageNumberText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
