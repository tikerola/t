export interface ProductData {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  type: string;
  availability?: string;
}

export interface ManufacturerLookupObject {
  [id: string]: { availability: string; manufacturer: string };
}

export interface ProductDataResponse {
  jackets: ProductData[];
  shirts: ProductData[];
  accessories: ProductData[];
}

export interface ResponseItem {
  id: string;
  DATAPAYLOAD: string;
}

export interface ManufacturerData {
  code: number;
  response: [ResponseItem] | string;
}

export const availabilityToString = {
  INSTOCK: "IN STOCK",
  OUTOFSTOCK: "OUT OF STOCK",
  LESSTHAN10: "LESS THAN 10",
};

export enum Categories {
  jackets = "jackets",
  shirts = "shirts",
  accessories = "accessories",
}
