import { app } from "./src/app";
import { ProductDataFetcher } from "./src/models/ProductDataFetcher";
import cron from "node-cron";

const port = process.env.PORT || 3001;
export let server: any;
export const productDataFetcher = new ProductDataFetcher();

/* Initialize jackets, shirts, accessories and availability data and update data once every five minutes */

productDataFetcher
  .initializeData()
  .then((): void => {
    cron.schedule("*/5 * * * *", (): void => {
      productDataFetcher.initializeData();
    });

    server = app.listen(port, (): void => {
      console.log(`Listening on port ${port}`);
      app.emit("appStarted");
    });
  })
  .catch((err) => console.log(err));
