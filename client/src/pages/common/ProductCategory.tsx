import React, { Dispatch, SetStateAction } from "react";
import { Item } from "../../hooks/useRequestData";
import {
  Title,
  ButtonContainer,
  Button,
  PageNumberText,
} from "./ProductCategory.styles";
import { renderProductData } from "./renderProductData";

interface IProps {
  title: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  productData: Item[];
  numOfProducts: number;
}

export const ProductCategory = ({
  title,
  page,
  setPage,
  productData,
  numOfProducts,
}: IProps): JSX.Element => {
  const handlePageChange = (direction: string): void => {
    if (direction === "previous" && page > 1)
      setPage((prevPage) => prevPage - 1);
    else if (direction === "next" && getPaginationEnd() < numOfProducts)
      setPage((prevPage) => prevPage + 1);
  };

  const getPaginationStart = (): number => {
    return (page - 1) * 10 + 1;
  };

  const getPaginationEnd = (): number => {
    return (page - 1) * 10 + 10;
  };

  return (
    <div>
      <Title>{title}</Title>
      {renderProductData(productData)}
      <ButtonContainer>
        <Button onClick={() => handlePageChange("previous")}>
          {"<< "}Prev
        </Button>
        <PageNumberText>
          {getPaginationStart()} - {getPaginationEnd()} / {numOfProducts}
        </PageNumberText>
        <Button onClick={() => handlePageChange("next")}>Next{" >>"}</Button>
      </ButtonContainer>
    </div>
  );
};
