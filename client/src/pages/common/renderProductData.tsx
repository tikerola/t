import React from "react";
import { Card } from "../../components/card/Card";
import { Item } from "../../hooks/useRequestData";
import { DefaultTheme, withTheme } from "styled-components";
import {
  CardContainer,
  CardName,
  ColorButton,
  Manufacturer,
  PriceTag,
  ColorContainer,
  Availability,
  ItemImageContainer,
  CustomHat,
  Tree,
} from "./ProductCategory.styles";

import { ReactComponent as JacketImage } from "../../assets/jacket.svg";
import { ReactComponent as ShirtImage } from "../../assets/shirt.svg";
import { ReactComponent as AccessoriesImage } from "../../assets/purse.svg";

interface IProps {
  productData: Item[];
  theme: DefaultTheme;
}

const renderItemImage = (item: Item): JSX.Element => {
  if (item.type === "jackets")
    return (
      <JacketImage fill={item.color[0]} stroke="black" width="25" height="25" />
    );
  else if (item.type === "shirts")
    return (
      <ShirtImage fill={item.color[0]} stroke="black" width="25" height="25" />
    );
  else
    return (
      <AccessoriesImage
        fill={item.color[0]}
        stroke="black"
        width="25"
        height="25"
      />
    );
};

export const RenderProductData = withTheme(
  ({ productData, theme }: IProps): JSX.Element => (
    <CardContainer>
      {productData.map(
        (item: Item): JSX.Element => {
          return (
            <Card key={item.id}>
              {item.price < theme.tag.cheap && (
                <>
                  <CustomHat width="55" height="55" />
                  <Tree fill="yellow" stroke="black" width="50" height="50" />
                </>
              )}
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
              <ItemImageContainer>{renderItemImage(item)}</ItemImageContainer>
              <PriceTag price={item.price}>${item.price}</PriceTag>
            </Card>
          );
        }
      )}
    </CardContainer>
  )
);
