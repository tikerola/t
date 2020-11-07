import { app } from "./src/app";
import { ProductDataFetcher } from "./src/models/ProductDataFetcher";
import cron from "node-cron";

const port = process.env.PORT || 3001;

export const productDataFetcher = new ProductDataFetcher();

productDataFetcher.initializeData().then((): void => {
  cron.schedule("*/5 * * * *", (): void => {
    productDataFetcher.initializeData();
    console.log("Refetching data...");
  });

  app.listen(port, (): void => {
    console.log(`Listening on port ${port}`);
  });
});
