import React from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { renderProductData } from "../commonJSX/renderProductData";
import { Title } from "./ProductCategory.styles";

type Props = {
  title: string;
  category: string;
};

export const ProductCategory = ({ title, category }: Props): JSX.Element => {
  const [productData] = useRequestData({ url: `/products/${category}` });

  console.log(productData, "piip");

  return (
    <div>
      <Title>{title}</Title>
      {renderProductData(productData)}
    </div>
  );
};
