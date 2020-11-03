import React, { useState } from "react";
import { Spinner } from "../../components/spinner/Spinner";
import { useRequestData } from "../../hooks/useRequestData";
import { ProductCategory } from "../common/ProductCategory";

export const Shirts = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const { productData, numOfProducts } = useRequestData({
    url: `/products/shirts/${page}`,
    dependency: page,
  });

  if (!productData.length) return <Spinner />;

  return (
    <ProductCategory
      title="Shirts"
      page={page}
      setPage={setPage}
      productData={productData}
      numOfProducts={numOfProducts}
    />
  );
};
