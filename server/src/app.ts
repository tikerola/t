import express, { Request, Response } from "express";
import {
  accessories,
  jackets,
  ProductData,
  shirts,
  manufacturerLookupObj,
} from "..";

const NUMBER_OF_PRODUCTS_TO_RETURN = 10;

const app = express();

const itemsToReturn = (page: number): { start: number; end: number } => {
  const start = (page - 1) * NUMBER_OF_PRODUCTS_TO_RETURN;
  const end = start + NUMBER_OF_PRODUCTS_TO_RETURN;

  return { start, end };
};

const populateAvailability = (products: ProductData[]): ProductData[] => {
  let productData: ProductData[] = [];
  for (const product of products) {
    productData.push({
      ...product,
      availability:
        manufacturerLookupObj[product.id.toUpperCase()].availability,
    });
  }

  return productData;
};

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.get("/products/jackets/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const filter = req.query.filter as string;

  const filteredJackets = filter
    ? jackets.filter((jacket) =>
        jacket.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    : jackets;
  const pagination = itemsToReturn(parseInt(page));

  const jacketsPopulatedWithManufacturer = populateAvailability(
    filteredJackets.slice(pagination.start, pagination.end)
  );

  res.status(200).send({
    items: jacketsPopulatedWithManufacturer,
    numOfItems: filteredJackets.length,
  });
});

app.get("/products/shirts/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const filter = req.query.filter as string;

  const filteredShirts = filter
    ? shirts.filter((shirt) =>
        shirt.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    : shirts;
  const pagination = itemsToReturn(parseInt(page));
  res.status(200).send({
    items: filteredShirts.slice(pagination.start, pagination.end),
    numOfItems: filteredShirts.length,
  });
});
app.get("/products/accessories/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const filter = req.query.filter as string;

  const filteredAccessories = filter
    ? accessories.filter((accessory) =>
        accessory.name.toLowerCase().startsWith(filter.toLowerCase())
      )
    : accessories;
  const pagination = itemsToReturn(parseInt(page));
  res.status(200).send({
    items: filteredAccessories.slice(pagination.start, pagination.end),
    numOfItems: filteredAccessories.length,
  });
});

export { app };
