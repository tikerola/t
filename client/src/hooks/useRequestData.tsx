import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface HookProps {
  url: string;
}

export interface ResponseData {
  id: string;
  color: string[];
  manufacturer: string;
  name: string;
  price: number;
  typer: string;
}

export const useRequestData = ({ url }: HookProps) => {
  const [productData, setProductData] = useState<ResponseData[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await axios["get"]<ResponseData[]>(url);
        setProductData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategory();
  });

  return [productData];
};
