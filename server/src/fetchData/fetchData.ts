import axios from "axios";

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

interface ProductDataResponse {
  jackets: ProductData[];
  shirts: ProductData[];
  accessories: ProductData[];
}

interface ResponseItem {
  id: string;
  DATAPAYLOAD: string;
}

interface ManufacturerData {
  code: number;
  response: [ResponseItem] | string;
}

enum Manufacturers {
  reps = "reps",
  abiblos = "abiplos",
  nouke = "nouke",
  xoon = "xoon",
  derp = "derp",
}

export class ProductDataFetcher {
  private jackets: ProductData[] = [];
  private shirts: ProductData[] = [];
  private accessories: ProductData[] = [];
  private availabilityData: ManufacturerLookupObject = {};
  private baseUrl: string = "https://bad-api-assignment.reaktor.com/";

  getJackets = (): ProductData[] => {
    return this.jackets;
  };
  getShirts = (): ProductData[] => {
    return this.shirts;
  };
  getAccessories = (): ProductData[] => {
    return this.accessories;
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
    const baseUrl = "https://bad-api-assignment.reaktor.com/availability/";
    let data: ManufacturerData;

    try {
      const response = await axios.get<ManufacturerData>(
        `${baseUrl}/availability/${manufacturer}` /* ,
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
}

/* class Ends */

// const fetchProductData = async (category: string): Promise<ProductData[]> => {
//   const baseUrl = "https://bad-api-assignment.reaktor.com/products/";
//   let data: ProductData[] = [];
//   try {
//     const response = await axios.get<ProductData[]>(`${baseUrl}${category}`);
//     data = response.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return data;
// };

// export const initializeProductData = async (): Promise<ProductDataResponse> => {
//   let jackets: ProductData[] = [];
//   let shirts: ProductData[] = [];
//   let accessories: ProductData[] = [];

//   try {
//     jackets = (await fetchProductData("jackets")) as ProductData[];
//     shirts = (await fetchProductData("shirts")) as ProductData[];
//     accessories = (await fetchProductData("accessories")) as ProductData[];
//   } catch (error) {
//     throw error;
//   }
//   return { jackets, shirts, accessories };
// };

// const fetchAvailabilityData = async (
//   manufacturer: Manufacturers
// ): Promise<ManufacturerData | undefined> => {
//   const baseUrl = "https://bad-api-assignment.reaktor.com/availability/";
//   let data: ManufacturerData;

//   try {
//     const response = await axios.get<ManufacturerData>(
//       `${baseUrl}${manufacturer}` /* ,
//       { headers: { "x-force-error-mode": "all" } } */
//     );
//     data = response.data;
//     if (data?.response === "[]") {
//       console.log("retry with manufacturer " + manufacturer);
//       return fetchAvailabilityData(manufacturer);
//     }
//   } catch (error) {
//     throw error;
//   }
//   return data;
// };

// const extractAvailability = (dataPayload: string): string => {
//   const availability = dataPayload
//     .split("<INSTOCKVALUE>")[1]
//     .split("</INSTOCKVALUE>")[0];

//   return availability;
// };

// export const initializeAvailabilityData = async (): Promise<
//   ManufacturerLookupObject
// > => {
//   let manufacturerLookupObj: ManufacturerLookupObject = {};

//   for await (const value of Object.values(Manufacturers)) {
//     try {
//       // 'Build in api' -error seems to just result in 200 code and an string '[]'
//       const data = await fetchAvailabilityData(value);

//       if (data?.response.length && typeof data.response !== "string") {
//         for (const obj of data.response) {
//           manufacturerLookupObj[obj.id] = {
//             availability: extractAvailability(obj.DATAPAYLOAD),
//             manufacturer: value,
//           };
//         }
//       }
//     } catch (error) {
//       console.log("Something went wrong when fetching availability data");
//     }
//   }

//   console.log("Works!!!!!");
//   return manufacturerLookupObj;
// };

// export const initializeData = async (): Promise<{
//   productData: ProductDataResponse;
//   availabilityData: ManufacturerLookupObject;
// }> => {
//   const productData = await initializeProductData();
//   const availabilityData = await initializeAvailabilityData();

//   return { productData, availabilityData };
// };
