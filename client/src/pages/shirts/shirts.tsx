import React from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { renderProductData } from "../common/renderProductData";
import { Title } from "../common/ProductCategory.styles";

export const Shirts = (): JSX.Element => {
  const [productData] = useRequestData({ url: `/products/shirts` });

  return (
    <div>
      <Title>Shirts</Title>
      {renderProductData(productData)}
    </div>
  );
};
