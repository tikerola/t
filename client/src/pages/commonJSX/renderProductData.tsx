import React from "react";
import {
  CardContainer,
  Title,
} from "../productCategory/ProductCategory.styles";
import { ResponseData } from "../../hooks/useRequestData";
import { Card } from "../../components/card/Card";

export const renderProductData = (productData: ResponseData[]): JSX.Element => (
  <CardContainer>
    {productData.map(
      (item: ResponseData): JSX.Element => {
        return (
          <Card key={item.id}>
            <p>name: {item.name}</p>
            <p>colors: {item.color.join(", ")}</p>
            <p>manufacturer: {item.manufacturer}</p>
            <p>price: {item.price}</p>
          </Card>
        );
      }
    )}
  </CardContainer>
);
