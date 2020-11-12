import axios from "axios";
import {
  availabilityToString,
  Categories,
  ManufacturerData,
  ManufacturerLookupObject,
  ProductData,
} from "./types/types";

/* Class responsible for fetching and holding the product data of jackets, shirts and accessories */

export class ProductDataFetcher {
  private jackets: ProductData[] = [];
  private shirts: ProductData[] = [];
  private accessories: ProductData[] = [];
  private manufacturers: string[] = [];
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
      this.jackets = (await this.fetchProductData(
        Categories.jackets
      )) as ProductData[];
      this.shirts = (await this.fetchProductData(
        Categories.shirts
      )) as ProductData[];
      this.accessories = (await this.fetchProductData(
        Categories.accessories
      )) as ProductData[];
    } catch (error) {
      throw error;
    }
  };

  /* Product Api called and result returned */

  fetchProductData = async (category: Categories): Promise<ProductData[]> => {
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

  /* Get unique manufacturers from jackets, shirts and accessories */

  extractUniqueManufacturers = async (): Promise<void> => {
    for (const jacket of this.jackets) {
      if (!this.manufacturers.includes(jacket.manufacturer))
        this.manufacturers.push(jacket.manufacturer);
    }
    for (const shirt of this.shirts) {
      if (!this.manufacturers.includes(shirt.manufacturer))
        this.manufacturers.push(shirt.manufacturer);
    }
    for (const accessory of this.accessories) {
      if (!this.manufacturers.includes(accessory.manufacturer))
        this.manufacturers.push(accessory.manufacturer);
    }
  };

  /* Populates availability data */

  initializeAvailabilityData = async (): Promise<void> => {
    await this.extractUniqueManufacturers();

    for (const value of this.manufacturers) {
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
    manufacturer: string
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

    return availabilityToString[
      availability as keyof typeof availabilityToString
    ];
  };

  /* When client asks for next set of jackets, we'll populate availability data for only those */

  populateAvailability = (products: ProductData[]): ProductData[] => {
    let productData: ProductData[] = [];
    let manufacturerData: { availability: string; manufacturer: string };
    for (const product of products) {
      manufacturerData = this.availabilityData[product.id.toUpperCase()];
      productData.push({
        ...product,
        availability: manufacturerData ? manufacturerData.availability : "",
      });
    }

    return productData;
  };
}
