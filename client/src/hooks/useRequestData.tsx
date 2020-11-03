import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface HookProps {
  url: string;
  dependency?: number;
}

export interface Item {
  id: string;
  color: string[];
  manufacturer: string;
  name: string;
  price: number;
  type: string;
}

export interface ResponseData {
  items: Item[];
  numOfItems: number;
}

export const useRequestData = ({ url, dependency }: HookProps) => {
  const [productData, setProductData] = useState<Item[]>([]);
  const [numOfProducts, setNumOfProducts] = useState(0);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await axios["get"]<ResponseData>(url);
        setProductData(data.items);
        setNumOfProducts(data.numOfItems);
      } catch (error) {
        console.log(error);
      }
    };

    getCategory();
  }, [dependency]);

  return { productData, numOfProducts };
};
