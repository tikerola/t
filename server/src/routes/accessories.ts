import express, { Request, Response } from "express";
import { productDataFetcher } from "../..";
import { itemIndexesFromPageNumber } from "./common/itemIndexesFromPageNumber";

const router = express.Router();

router.get("/products/accessories/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const { filter, ppp: productsPerPage } = req.query as {
    filter: string;
    ppp: string;
  };

  const filteredAccessories = filter
    ? productDataFetcher
        .getAccessories()
        .filter((accessory) =>
          accessory.name.toLowerCase().startsWith(filter.toLowerCase())
        )
    : productDataFetcher.getAccessories();

  const { start, end } = itemIndexesFromPageNumber(
    parseInt(page),
    parseInt(productsPerPage)
  );

  const AccessoriesPopulatedWithAvailability = productDataFetcher.populateAvailability(
    filteredAccessories.slice(start, end)
  );

  res.status(200).send({
    items: AccessoriesPopulatedWithAvailability,
    numOfItems: filteredAccessories.length,
  });
});

export { router as accessoryRouter };
