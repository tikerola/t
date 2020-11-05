import { app } from "./src/app";
import {
  initializeManufacturerData,
  initializeProductData,
} from "./src/fetchData/fetchData";
import cron from "node-cron";

const port = process.env.PORT || 3001;

export interface ProductData {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  type: string;
  availability?: string;
}

export interface ManufacturerLookupObject {
  [id: string]: { availability: string; manufacturer: string };
}

export let jackets: ProductData[];
export let shirts: ProductData[];
export let accessories: ProductData[];
export let manufacturerLookupObj: ManufacturerLookupObject;

initializeManufacturerData().then((data) => (manufacturerLookupObj = data));

initializeProductData().then((data) => {
  jackets = data.jackets;
  shirts = data.shirts;
  accessories = data.accessories;

  cron.schedule("*/5 * * * *", async () => {
    const data = await initializeProductData();
    jackets = data.jackets;
    shirts = data.shirts;
    accessories = data.accessories;
    console.log("Fetching data...");
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
