import axios from "axios";
import {
  ProductData,
  ManufacturerLookupObject,
  ManufacturerData,
  Manufacturers,
  availabilityToString,
} from "./types/types";

/* Class responsible for fetching and holding the product data of jackets, shirts and accessories */

export class ProductDataFetcher {
  private jackets: ProductData[] = [];
  private shirts: ProductData[] = [];
  private accessories: ProductData[] = [];
  private availabilityData: ManufacturerLookupObject = {};
  private baseUrl: string = "https://bad-api-assignment.reaktor.com";

  getJackets = (): ProductData[] => {
    return this.jackets;
  };
  getShirts = (): ProductData[] => {
    return this.shirts;
  };
  getAccessories = (): ProductData[] => {
    return this.accessories;
  };
  getAvailabilityData = (): ManufacturerLookupObject => {
    return this.availabilityData;
  };

  /* Populates jackets, shirts, accessories and availability data */

  initializeData = async (): Promise<void> => {
    await this.initializeProductData();
    await this.initializeAvailabilityData();
  };

  /* Populates jackets, shirts and accessories */

  initializeProductData = async (): Promise<void> => {
    try {
      this.jackets = (await this.fetchProductData("jackets")) as ProductData[];
      this.shirts = (await this.fetchProductData("shirts")) as ProductData[];
      this.accessories = (await this.fetchProductData(
        "accessories"
      )) as ProductData[];
    } catch (error) {
      throw error;
    }
  };

  /* Product Api called and result returned */

  fetchProductData = async (category: string): Promise<ProductData[]> => {
    let data: ProductData[] = [];
    try {
      const response = await axios.get<ProductData[]>(
        `${this.baseUrl}/products/${category}`
      );

      data = response.data;
    } catch (error) {
      console.log(error);
    }
    return data;
  };

  /* Populates availability data */

  initializeAvailabilityData = async (): Promise<void> => {
    for await (const value of Object.values(Manufacturers)) {
      try {
        const data = await this.fetchAvailabilityData(value);

        if (data?.response.length && typeof data.response !== "string") {
          for (const obj of data.response) {
            this.availabilityData[obj.id] = {
              availability: this.extractAvailability(obj.DATAPAYLOAD),
              manufacturer: value,
            };
          }
        }
      } catch (error) {
        console.log("Something went wrong when fetching availability data");
      }
    }
  };

  /* 
    Api call for availability data.
    'Build in api' -error seems to just result in 200 code and an string '[]'.
    Tackle that by recursively calling function until success  
  */

  fetchAvailabilityData = async (
    manufacturer: Manufacturers
  ): Promise<ManufacturerData | undefined> => {
    let data: ManufacturerData;

    try {
      const response = await axios.get<ManufacturerData>(
        `${this.baseUrl}/availability/${manufacturer}`
        /* , { headers: { "x-force-error-mode": "all" } } */
      );
      data = response.data;
      if (data?.response === "[]") {
        return this.fetchAvailabilityData(manufacturer);
      }
    } catch (error) {
      throw error;
    }
    return data;
  };

  /* Get the availability value from a DATAPAYLOAD field */

  extractAvailability = (dataPayload: string): string => {
    const availability = dataPayload
      .split("<INSTOCKVALUE>")[1]
      .split("</INSTOCKVALUE>")[0];

    return availability;
  };

  /* When client asks for next set of jackets, we'll populate availability data for only those */

  populateAvailability = (products: ProductData[]): ProductData[] => {
    let productData: ProductData[] = [];
    let manufacturerData: { availability: string; manufacturer: string };
    for (const product of products) {
      manufacturerData = this.availabilityData[product.id.toUpperCase()];
      productData.push({
        ...product,
        availability: manufacturerData
          ? availabilityToString[
              manufacturerData.availability as keyof typeof availabilityToString
            ]
          : "",
      });
    }

    return productData;
  };
}
