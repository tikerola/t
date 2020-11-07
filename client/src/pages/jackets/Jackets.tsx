import React, { useState } from "react";
import { Spinner } from "../../components/spinner/Spinner.styles";
import { useRequestData } from "../../hooks/useRequestData";
import { PRODUCTS_PER_PAGE } from "../common/constants";
import { ProductCategory } from "../common/ProductCategory";

export const Jackets = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const { productData, numOfProducts } = useRequestData({
    url: `/products/jackets/${page}?filter=${filter}&ppp=${PRODUCTS_PER_PAGE}`,
    filterUrl: `/products/jackets/${filter}`,
    dependency: page,
    filter,
  });

  if (!productData.length && !filter) return <Spinner />;

  return (
    <ProductCategory
      title="Jackets"
      page={page}
      setPage={setPage}
      productData={productData}
      numOfProducts={numOfProducts}
      setFilter={setFilter}
    />
  );
};
