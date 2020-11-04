import React from "react";
import { Title, TextContainer, Text, PageName } from "./Home.styles";

export const Home = (): JSX.Element => {
  return (
    <div>
      <PageName>Accessory Paradise</PageName>
      <Title>Hey there...</Title>
      <TextContainer>
        <Text>
          Browse through. We've got pretty much everything a person might ever
          need, like jackets, shirts, sunglasses, bracelets and shit...
        </Text>
      </TextContainer>
    </div>
  );
};
