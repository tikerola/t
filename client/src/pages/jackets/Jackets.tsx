import React, { useState } from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { ProductCategory } from "../common/ProductCategory";

export const Jackets = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const [productData] = useRequestData({
    url: `/products/jackets/${page}`,
    dependency: page,
  });

  return (
    <ProductCategory
      title="Jackets"
      page={page}
      setPage={setPage}
      productData={productData}
    />
  );
};
