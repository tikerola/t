import styled from "styled-components";

export const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  color: ${(props) => props.theme.titleColor};
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CardName = styled.div`
  //height: 40px;
  border-radius: 5px;
  /* height: 30px;
  margin-bottom: 10px; */
  text-align: center;
  background-color: white;
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
  margin: 10px auto;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
`;

export const ColorButton = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-between;
  margin: 15px auto;
  background-color: #333;
  border-radius: 8px;
`;

export const Button = styled.div`
  background-color: ${(props) => props.theme.button.bgColor};
  width: 150px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

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
