import React, { useState } from "react";
import { useRequestData } from "../../hooks/useRequestData";
import { ProductCategory } from "../common/ProductCategory";

export const Accessories = (): JSX.Element => {
  const [page, setPage] = useState(1);

  const [productData] = useRequestData({
    url: `/products/accessories/${page}`,
    dependency: page,
  });

  return (
    <ProductCategory
      title="Accessories"
      page={page}
      setPage={setPage}
      productData={productData}
    />
  );
};
