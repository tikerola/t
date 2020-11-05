import { url } from "inspector";
import React, { Dispatch, SetStateAction } from "react";
import { Item } from "../../hooks/useRequestData";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonContainer,
  ButtonContainerBackground,
  PageNumberText,
  Title,
  Input,
  InputContainer,
  Icon,
} from "./ProductCategory.styles";
import { renderProductData } from "./renderProductData";

interface IProps {
  title: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  productData: Item[];
  numOfProducts: number;
  setFilter: Dispatch<SetStateAction<string>>;
}

export const ProductCategory = ({
  title,
  page,
  setPage,
  productData,
  numOfProducts,
  setFilter,
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
    const end = (page - 1) * 10 + 10;
    return end < numOfProducts ? end : numOfProducts;
  };

  return (
    <div>
      <Title>{title}</Title>
      <InputContainer>
        <Icon icon={faSearch} color="#bbb" />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPage(1);
            setFilter(e.target.value);
          }}
          placeholder="Search by Name"
        />
      </InputContainer>
      {renderProductData(productData)}
      <ButtonContainerBackground>
        <ButtonContainer>
          <Button onClick={() => handlePageChange("previous")}>
            {"<< "}Prev
          </Button>
          <PageNumberText>
            {getPaginationStart()} - {getPaginationEnd()} / {numOfProducts}
          </PageNumberText>
          <Button onClick={() => handlePageChange("next")}>Next{" >>"}</Button>
        </ButtonContainer>
      </ButtonContainerBackground>
    </div>
  );
};
