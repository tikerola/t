import express, { Request, Response } from "express";
import { productDataFetcher } from "../..";
import { itemIndexesFromPageNumber } from "./common/itemIndexesFromPageNumber";

const router = express.Router();

router.get("/products/accessories/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const filter = req.query.filter as string;

  const filteredAccessories = filter
    ? productDataFetcher
        .getAccessories()
        .filter((accessory) =>
          accessory.name.toLowerCase().startsWith(filter.toLowerCase())
        )
    : productDataFetcher.getAccessories();
  const pagination = itemIndexesFromPageNumber(parseInt(page));

  const AccessoriesPopulatedWithAvailability = productDataFetcher.populateAvailability(
    filteredAccessories.slice(pagination.start, pagination.end)
  );

  res.status(200).send({
    items: AccessoriesPopulatedWithAvailability,
    numOfItems: filteredAccessories.length,
  });
});

export { router as accessoryRouter };
