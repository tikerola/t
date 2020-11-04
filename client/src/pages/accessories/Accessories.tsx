import React, { useState } from "react";
import { Spinner } from "../../components/spinner/Spinner.styles";
import { useRequestData } from "../../hooks/useRequestData";
import { ProductCategory } from "../common/ProductCategory";

export const Accessories = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const { productData, numOfProducts } = useRequestData({
    url: `/products/accessories/${page}`,
    filterUrl: `/products/accessories${filter}`,
    dependency: page,
    filter,
  });

  if (!productData.length) return <Spinner />;

  return (
    <ProductCategory
      title="Accessories"
      page={page}
      setPage={setPage}
      productData={productData}
      numOfProducts={numOfProducts}
      setFilter={setFilter}
    />
  );
};
