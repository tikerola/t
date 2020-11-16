import axios from "axios";
import {
  availabilityToString,
  Categories,
  ManufacturerData,
  AvailabilityLookupObject,
  ProductData,
} from "./types/types";

/* Class responsible for fetching and holding the product data of jackets, shirts and accessories */

export class ProductDataFetcher {
  private jackets: ProductData[] = [];
  private shirts: ProductData[] = [];
  private accessories: ProductData[] = [];
  private manufacturers: string[] = [];
  private availabilityData: AvailabilityLookupObject = {};
  private baseUrl: string = "https://bad-api-assignment.reaktor.com";

  getItems = (category: Categories): ProductData[] => {
    if (category === Categories.jackets) return this.jackets;
    else if (category === Categories.shirts) return this.shirts;
    else return this.accessories;
  };

  getManufacturers = (): string[] => {
    return this.manufacturers;
  };

  getAvailabilityData = (): AvailabilityLookupObject => {
    return this.availabilityData;
  };

  /* Populates jackets, shirts, accessories and availability data */

  initializeData = async (): Promise<void> => {
    await this.initializeProductData();
    await this.initializeAvailabilityData();
  };

  /* Populates jackets, shirts and accessories */

  initializeProductData = async (): Promise<void> => {
    this.jackets = await this.fetchProductData(Categories.jackets);
    this.shirts = await this.fetchProductData(Categories.shirts);
    this.accessories = await this.fetchProductData(Categories.accessories);
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
      // In case of error, front-end get's an empty product data array
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
      const data = await this.fetchAvailabilityData(value);

      // if we have data.response which is of type string ('[]' or 'Not Found Error'), skip over loop

      if (data?.response.length && data.response instanceof Array) {
        for (const obj of data.response) {
          this.availabilityData[obj.id] = {
            availability: this.extractAvailability(obj.DATAPAYLOAD),
            manufacturer: value,
          };
        }
      }
    }
  };

  /* 
    Api call for availability data.
    'Build in api' -error seems to just result in 200 code and an string '[]'.
    Tackling that by recursively calling function until success or failure 3 times 
    In case of failure, products get just an empty string as availability
  */

  fetchAvailabilityData = async (
    manufacturer: string,
    retries = 2
  ): Promise<ManufacturerData> => {
    let data: ManufacturerData;

    try {
      const response = await axios.get<ManufacturerData>(
        `${this.baseUrl}/availability/${manufacturer}`
        /* { headers: { "x-force-error-mode": "all" } } */
      );
      data = response.data;
      if (data?.response === "[]" && retries > 0) {
        return this.fetchAvailabilityData(manufacturer, retries - 1);
      }
    } catch (error) {
      return {
        code: 404,
        response: "Not Found Error",
      };
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
