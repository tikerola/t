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
}

export const ProductCategory = ({
  title,
  page,
  setPage,
  productData,
}: IProps): JSX.Element => {
  return (
    <div>
      <Title>{title}</Title>
      {renderProductData(productData)}
      <ButtonContainer>
        <Button onClick={() => setPage((prevPage) => prevPage - 1)}>
          {"<< "}Previous
        </Button>
        <PageNumberText>
          {(page - 1) * 10 + 1} - {(page - 1) * 10 + 10}
        </PageNumberText>
        <Button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next{" >>"}
        </Button>
      </ButtonContainer>
    </div>
  );
};
