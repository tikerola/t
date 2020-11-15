import { Request, Response } from "express";
import { productDataFetcher } from "../../..";
import { Categories } from "../../models/types/types";
import { itemIndexesFromPageNumber } from "./itemIndexesFromPageNumber";

/* Common controller for all the routes */

export const productsController = (category: Categories) => (
  req: Request,
  res: Response
) => {
  const { page } = req.params;
  const { filter, ppp: productsPerPage } = req.query as {
    filter: string;
    ppp: string;
  };

  /* Return products which start with filter */

  const filteredItems = filter
    ? productDataFetcher
        .getItems(category)
        .filter((item) =>
          item.name.toLowerCase().startsWith(filter.toLowerCase())
        )
    : productDataFetcher.getItems(category);

  /* Products between these indexes we want to return  */

  const { start, end } = itemIndexesFromPageNumber(
    parseInt(page),
    parseInt(productsPerPage)
  );

  /* Populate availability data of products */

  const itemsPopulatedWithAvailability = productDataFetcher.populateAvailability(
    filteredItems.slice(start, end)
  );

  /* Return products and the length of filtered products */

  res.status(200).send({
    items: itemsPopulatedWithAvailability,
    numOfItems: filteredItems.length,
  });
};
