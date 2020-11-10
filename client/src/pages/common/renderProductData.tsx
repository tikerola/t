import React from "react";
import { Card } from "../../components/card/Card";
import { Item } from "../../hooks/useRequestData";
import {
  CardContainer,
  CardName,
  ColorButton,
  Manufacturer,
  PriceTag,
  ColorContainer,
  Availability,
} from "./ProductCategory.styles";

interface IProps {
  productData: Item[];
}

export const RenderProductData = ({ productData }: IProps): JSX.Element => (
  <CardContainer>
    {productData.map(
      (item: Item): JSX.Element => {
        return (
          <Card key={item.id}>
            <CardName>{item.name}</CardName>
            <Manufacturer>{item.manufacturer}</Manufacturer>
            <ColorContainer>
              Available colors:{" "}
              {item.color.map((c, i) => {
                return (
                  <ColorButton data-testid="color-button" key={i} color={c} />
                );
              })}
              <Availability>{item.availability}</Availability>
            </ColorContainer>
            <PriceTag price={item.price}>${item.price}</PriceTag>
          </Card>
        );
      }
    )}
  </CardContainer>
);
