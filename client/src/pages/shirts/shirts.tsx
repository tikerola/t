import React, { useState } from "react";
import { Spinner } from "../../components/spinner/Spinner.styles";
import { useRequestData } from "../../hooks/useRequestData";
import { PRODUCTS_PER_PAGE } from "../common/constants";
import { ProductCategory } from "../common/ProductCategory";

export const Shirts = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const { productData, numOfProducts } = useRequestData({
    url: `/products/shirts/${page}?filter=${filter}&ppp=${PRODUCTS_PER_PAGE}`,
    dependencies: [page, filter],
  });

  if (!productData.length && !filter) return <Spinner />;

  return (
    <ProductCategory
      title="Shirts"
      page={page}
      setPage={setPage}
      productData={productData}
      numOfProducts={numOfProducts}
      setFilter={setFilter}
    />
  );
};
