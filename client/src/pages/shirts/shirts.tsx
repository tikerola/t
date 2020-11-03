import React, { useState } from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { ProductCategory } from "../common/ProductCategory";

export const Shirts = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const [productData] = useRequestData({
    url: `/products/shirts/${page}`,
    dependency: page,
  });

  return (
    <ProductCategory
      title="Shirts"
      page={page}
      setPage={setPage}
      productData={productData}
    />
  );
};
