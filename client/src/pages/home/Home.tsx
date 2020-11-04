import React from "react";
import { Title, TextContainer, Text } from "./Home.styles";

export const Home = (): JSX.Element => {
  return (
    <div>
      <Title>Welcome!</Title>
      <TextContainer>
        <Text>
          Browse through. We've got pretty much everything a person might ever
          need, like sunglasses and shit...
        </Text>
      </TextContainer>
    </div>
  );
};
