import express, { Request, Response } from "express";
import {
  accessories,
  jackets,
  ProductData,
  shirts,
  manufacturerLookupObj,
  ManufacturerLookupObject,
} from "..";

const NUMBER_OF_PRODUCTS_TO_RETURN = 10;

const app = express();

const availabilityToString = {
  INSTOCK: "IN STOCK",
  OUTOFSTOCK: "OUT OF STOCK",
  LESSTHAN10: "LESS THAN 10",
};

const itemsToReturn = (page: number): { start: number; end: number } => {
  const start = (page - 1) * NUMBER_OF_PRODUCTS_TO_RETURN;
  const end = start + NUMBER_OF_PRODUCTS_TO_RETURN;

  return { start, end };
};

const populateAvailability = (products: ProductData[]): ProductData[] => {
  let productData: ProductData[] = [];
  let manufacturerData: { availability: string; manufacturer: string };
  for (const product of products) {
    manufacturerData = manufacturerLookupObj[product.id.toUpperCase()];
    productData.push({
      ...product,
      availability: manufacturerData
        ? availabilityToString[
            manufacturerData.availability as keyof typeof availabilityToString
          ]
        : "",
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

  const jacketsPopulatedWithAvailability = populateAvailability(
    filteredJackets.slice(pagination.start, pagination.end)
  );

  res.status(200).send({
    items: jacketsPopulatedWithAvailability,
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

  const ShirtsPopulatedWithAvailability = populateAvailability(
    filteredShirts.slice(pagination.start, pagination.end)
  );

  res.status(200).send({
    items: ShirtsPopulatedWithAvailability,
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

  const AccessoriesPopulatedWithAvailability = populateAvailability(
    filteredAccessories.slice(pagination.start, pagination.end)
  );

  res.status(200).send({
    items: AccessoriesPopulatedWithAvailability,
    numOfItems: filteredAccessories.length,
  });
});

export { app };
