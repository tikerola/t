import express, { Request, Response } from "express";
import { productDataFetcher } from "../..";
import { itemIndexesFromPageNumber } from "./common/itemIndexesFromPageNumber";

const router = express.Router();

router.get("/products/jackets/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const filter = req.query.filter as string;

  const filteredJackets = filter
    ? productDataFetcher
        .getJackets()
        .filter((jacket) =>
          jacket.name.toLowerCase().startsWith(filter.toLowerCase())
        )
    : productDataFetcher.getJackets();
  const pagination = itemIndexesFromPageNumber(parseInt(page));

  const jacketsPopulatedWithAvailability = productDataFetcher.populateAvailability(
    filteredJackets.slice(pagination.start, pagination.end)
  );

  res.status(200).send({
    items: jacketsPopulatedWithAvailability,
    numOfItems: filteredJackets.length,
  });
});

export { router as jacketsRouter };
