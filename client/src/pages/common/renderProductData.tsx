import React from "react";
import { Card } from "../../components/card/Card";
import { Item } from "../../hooks/useRequestData";
import {
  CardContainer,
  CardName,
  ColorButton,
  Manufacturer,
  PriceTag,
} from "./ProductCategory.styles";

export const renderProductData = (productData: Item[]): JSX.Element => (
  <CardContainer>
    {productData.map(
      (item: Item): JSX.Element => {
        return (
          <Card key={item.id}>
            <CardName>{item.name}</CardName>
            <Manufacturer>{item.manufacturer}</Manufacturer>
            <p>
              Available colors:{" "}
              {item.color.map((c, i) => {
                return <ColorButton key={i} color={c} />;
              })}
            </p>
            <PriceTag price={item.price}>${item.price}</PriceTag>
          </Card>
        );
      }
    )}
  </CardContainer>
);
