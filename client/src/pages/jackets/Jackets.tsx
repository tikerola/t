import React from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { renderProductData } from "../common/renderProductData";
import { Title } from "../common/ProductCategory.styles";

export const Jackets = (): JSX.Element => {
  const [productData] = useRequestData({ url: `/products/jackets` });

  return (
    <div>
      <Title>Jackets</Title>
      {renderProductData(productData)}
    </div>
  );
};
