import React, { useState } from "react";
import { Spinner } from "../../components/spinner/Spinner";
import { useRequestData } from "../../hooks/useRequestData";
import { ProductCategory } from "../common/ProductCategory";

export const Jackets = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const { productData, numOfProducts } = useRequestData({
    url: `/products/jackets/${page}`,
    dependency: page,
  });

  if (!productData.length) return <Spinner />;

  return (
    <ProductCategory
      title="Jackets"
      page={page}
      setPage={setPage}
      productData={productData}
      numOfProducts={numOfProducts}
    />
  );
};
