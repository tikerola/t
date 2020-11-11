import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";

export const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 25%;
  color: ${(props) => props.theme.titleColor};
  font-size: 2.2rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
`;

export const InputContainer = styled.div`
  width: 230px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  top: 15px;
  right: 40px;
`;

export const Icon = styled(FontAwesomeIcon)`
  align-self: center;
`;

export const Input = styled.input`
  width: 200px;
  height: 30px;
  padding: 2px;
  border-radius: 5px;
  background-color: rgba(187, 187, 187, 0.5);
  outline-style: none;
  z-index: 4;

  &::placeholder {
    color: #333;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    position: fixed;
  }
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

export const Availability = styled.div`
  margin-top: 15px;
  font-family: "Luckiest Guy", cursive;
  text-align: center;
`;

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

type ButtonProps = {
  "data-testid": string;
};

export const ColorButton = styled.div<ButtonProps>`
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

  @media (max-width: ${({ theme }) => theme.pad}) {
    width: 70%;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 90%;
  }
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

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100px;
  }
`;

export const PageNumberText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const shake = keyframes` 
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

export const NoMatchesTextContainer = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);

  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 20vh;
    position: relative;
    top: 100px;
  }
`;

export const NoMatchesText = styled.p`
  font-size: 2.5rem;
  animation: ${shake} 1s linear;
`;
