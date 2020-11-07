import express, { Request, Response } from "express";
import { productDataFetcher } from "../..";
import { itemIndexesFromPageNumber } from "./common/itemIndexesFromPageNumber";

const router = express.Router();

router.get("/products/jackets/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const filter = req.query.filter as string;

  /* Return products which start with filter */

  const filteredJackets = filter
    ? productDataFetcher
        .getJackets()
        .filter((jacket) =>
          jacket.name.toLowerCase().startsWith(filter.toLowerCase())
        )
    : productDataFetcher.getJackets();

  /* Products between these indexes we want to return  */

  const { start, end } = itemIndexesFromPageNumber(parseInt(page));

  /* Populate availability data of products */

  const jacketsPopulatedWithAvailability = productDataFetcher.populateAvailability(
    filteredJackets.slice(start, end)
  );

  /* Return products and the length of filtered products */

  res.status(200).send({
    items: jacketsPopulatedWithAvailability,
    numOfItems: filteredJackets.length,
  });
});

export { router as jacketsRouter };
