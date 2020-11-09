import axios from "axios";
import { useEffect, useState } from "react";

interface HookProps {
  url: string;
  dependencies: [page: number, filter: string];
}

export interface Item {
  id: string;
  color: string[];
  manufacturer: string;
  name: string;
  price: number;
  type: string;
  availability?: string;
}

export interface ResponseData {
  items: Item[];
  numOfItems: number;
}

export const useRequestData = ({ url, dependencies }: HookProps) => {
  const [productData, setProductData] = useState<Item[]>([]);
  const [numOfProducts, setNumOfProducts] = useState(0);

  const [page, filter] = dependencies;

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
  }, [page, filter, url]);

  return { productData, numOfProducts };
};
