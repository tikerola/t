import React, { useState } from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { renderProductData } from "../common/renderProductData";
import {
  Title,
  Button,
  ButtonContainer,
  PageNumberText,
} from "../common/ProductCategory.styles";

export const Accessories = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const [productData] = useRequestData({
    url: `/products/accessories/${page}`,
    dependency: page,
  });

  return (
    <div>
      <Title>Accessories</Title>
      {renderProductData(productData)}
      <ButtonContainer>
        <Button onClick={() => setPage((prevPage) => prevPage - 1)}>
          {"<< "}Previous
        </Button>
        <PageNumberText>
          {(page - 1) * 10 + 1} - {(page - 1) * 10 + 10}
        </PageNumberText>
        <Button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next{" >>"}
        </Button>
      </ButtonContainer>
    </div>
  );
};
