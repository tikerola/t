import express, { Request, Response } from "express";
import { productDataFetcher } from "../..";
import { itemIndexesFromPageNumber } from "./common/itemIndexesFromPageNumber";

const router = express.Router();

router.get("/products/shirts/:page", (req: Request, res: Response) => {
  const { page } = req.params;
  const { filter, ppp: productsPerPage } = req.query as {
    filter: string;
    ppp: string;
  };

  const filteredShirts = filter
    ? productDataFetcher
        .getShirts()
        .filter((shirt) =>
          shirt.name.toLowerCase().startsWith(filter.toLowerCase())
        )
    : productDataFetcher.getShirts();

  const { start, end } = itemIndexesFromPageNumber(
    parseInt(page),
    parseInt(productsPerPage)
  );

  const ShirtsPopulatedWithAvailability = productDataFetcher.populateAvailability(
    filteredShirts.slice(start, end)
  );

  res.status(200).send({
    items: ShirtsPopulatedWithAvailability,
    numOfItems: filteredShirts.length,
  });
});

export { router as shirtsRouter };
