import React from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { renderProductData } from "../common/renderProductData";
import { Title } from "../common/ProductCategory.styles";

export const Accessories = (): JSX.Element => {
  const [productData] = useRequestData({ url: `/products/accessories` });

  return (
    <div>
      <Title>Accessories</Title>
      {renderProductData(productData)}
    </div>
  );
};
