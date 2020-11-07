import { app } from "./src/app";
import { ProductDataFetcher } from "./src/fetchData/fetchData";
import cron from "node-cron";

const port = process.env.PORT || 3001;

// export let jackets: ProductData[];
// export let shirts: ProductData[];
// export let accessories: ProductData[];
// export let manufacturerLookupObj: ManufacturerLookupObject;

export const productDataFetcher = new ProductDataFetcher();

productDataFetcher.initializeData().then(() => {
  cron.schedule("*/5 * * * *", (): void => {
    productDataFetcher.initializeData();
    console.log("Fetching data...");
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});

// initializeData().then((data) => {
//   const { productData, availabilityData } = data;

//   jackets = productData.jackets;
//   shirts = productData.shirts;
//   accessories = productData.accessories;

//   manufacturerLookupObj = availabilityData;

//   cron.schedule("*/5 * * * *", async () => {
//     const data = await initializeData();
//     jackets = data.productData.jackets;
//     shirts = data.productData.shirts;
//     accessories = data.productData.accessories;

//     manufacturerLookupObj = data.availabilityData;
//     console.log("Fetching data...");
//   });

//   app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
//   });
// });
