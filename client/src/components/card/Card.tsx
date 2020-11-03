import React from "react";
import { CardContainer } from "./Card.styles";

interface Props {
  children: React.ReactNode;
}

export const Card = ({ children }: Props): JSX.Element => {
  return <CardContainer>{children}</CardContainer>;
};
