import axios from "axios";
import {
  ProductData,
  ManufacturerLookupObject,
  ManufacturerData,
  Manufacturers,
  availabilityToString,
} from "./types/types";

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

  initializeData = async (): Promise<void> => {
    await this.initializeProductData();
    await this.initializeAvailabilityData();
  };

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

  fetchAvailabilityData = async (
    manufacturer: Manufacturers
  ): Promise<ManufacturerData | undefined> => {
    let data: ManufacturerData;

    try {
      const response = await axios.get<ManufacturerData>(
        `${this.baseUrl}/availability/${manufacturer}` /* ,
        { headers: { "x-force-error-mode": "all" } } */
      );
      data = response.data;
      if (data?.response === "[]") {
        console.log("retry with manufacturer " + manufacturer);
        return this.fetchAvailabilityData(manufacturer);
      }
    } catch (error) {
      throw error;
    }
    return data;
  };

  extractAvailability = (dataPayload: string): string => {
    const availability = dataPayload
      .split("<INSTOCKVALUE>")[1]
      .split("</INSTOCKVALUE>")[0];

    return availability;
  };

  initializeAvailabilityData = async (): Promise<void> => {
    for await (const value of Object.values(Manufacturers)) {
      try {
        // 'Build in api' -error seems to just result in 200 code and an string '[]'
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

    console.log("Works!!!!!");
  };

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
