import express, { Request, Response } from "express";
import { productDataFetcher } from "../..";
import { itemIndexesFromPageNumber } from "./common/itemIndexesFromPageNumber";

const router = express.Router();

router.get("/products/shirts/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const filter = req.query.filter as string;

  const filteredShirts = filter
    ? productDataFetcher
        .getShirts()
        .filter((shirt) =>
          shirt.name.toLowerCase().startsWith(filter.toLowerCase())
        )
    : productDataFetcher.getShirts();
  const pagination = itemIndexesFromPageNumber(parseInt(page));

  const ShirtsPopulatedWithAvailability = productDataFetcher.populateAvailability(
    filteredShirts.slice(pagination.start, pagination.end)
  );

  res.status(200).send({
    items: ShirtsPopulatedWithAvailability,
    numOfItems: filteredShirts.length,
  });
});

export { router as shirtsRouter };
