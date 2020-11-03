import React, { useState } from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { renderProductData } from "../common/renderProductData";
import {
  Button,
  ButtonContainer,
  PageNumberText,
  Title,
} from "../common/ProductCategory.styles";

export const Shirts = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const [productData] = useRequestData({
    url: `/products/shirts/${page}`,
    dependency: page,
  });

  return (
    <div>
      <Title>Shirts</Title>
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
