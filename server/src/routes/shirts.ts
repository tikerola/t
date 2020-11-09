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

  /* Return products which start with filter */

  const filteredShirts = filter
    ? productDataFetcher
        .getShirts()
        .filter((shirt) =>
          shirt.name.toLowerCase().startsWith(filter.toLowerCase())
        )
    : productDataFetcher.getShirts();

  /* Products between these indexes we want to return  */

  const { start, end } = itemIndexesFromPageNumber(
    parseInt(page),
    parseInt(productsPerPage)
  );

  /* Populate availability data of products */

  const shirtsPopulatedWithAvailability = productDataFetcher.populateAvailability(
    filteredShirts.slice(start, end)
  );

  res.status(200).send({
    items: shirtsPopulatedWithAvailability,
    numOfItems: filteredShirts.length,
  });
});

export { router as shirtsRouter };
