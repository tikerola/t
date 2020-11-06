import axios from "axios";
import { ProductData, ManufacturerLookupObject } from "../../index";

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
  response: [ResponseItem];
}

enum Manufacturers {
  reps = "reps",
  abiblos = "abiplos",
  nouke = "nouke",
  xoon = "xoon",
  derp = "derp",
}

const fetchProductData = async (category: string): Promise<ProductData[]> => {
  const baseUrl = "https://bad-api-assignment.reaktor.com/products/";
  let data: ProductData[] = [];
  try {
    const response = await axios.get<ProductData[]>(`${baseUrl}${category}`);
    data = response.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const initializeProductData = async (): Promise<ProductDataResponse> => {
  let jackets: ProductData[] = [];
  let shirts: ProductData[] = [];
  let accessories: ProductData[] = [];

  try {
    jackets = (await fetchProductData("jackets")) as ProductData[];
    shirts = (await fetchProductData("shirts")) as ProductData[];
    accessories = (await fetchProductData("accessories")) as ProductData[];
  } catch (error) {
    throw error;
  }
  return { jackets, shirts, accessories };
};

const fetchManufacturerData = async (
  manufacturer: Manufacturers
): Promise<ManufacturerData | undefined> => {
  const baseUrl = "https://bad-api-assignment.reaktor.com/availability/";
  let data: ManufacturerData | undefined;

  try {
    const response = await axios.get<ManufacturerData>(
      `${baseUrl}${manufacturer}`
      /*  ,
      { headers: { "x-force-error-mode": "all" } } */
    );
    data = response.data;
  } catch (error) {
    throw error;
  }
  return data;
};

const extractAvailability = (dataPayload: string): string => {
  const availability = dataPayload
    .split("<INSTOCKVALUE>")[1]
    .split("</INSTOCKVALUE>")[0];

  return availability;
};

export const initializeManufacturerData = async () => {
  let manufacturerLookupObj: ManufacturerLookupObject = {};

  for await (const value of Object.values(Manufacturers)) {
    try {
      const data = await fetchManufacturerData(value);
      if (data?.response.length && data.code === 200) {
        for (const obj of data.response) {
          manufacturerLookupObj[obj.id] = {
            availability: extractAvailability(obj.DATAPAYLOAD),
            manufacturer: value,
          };
        }
      }
    } catch (error) {
      // Build in api error seems to just result in 200 code and an empty array
      console.log("Something went wrong when fetching availability data");
    }
  }

  console.log("Works!!!!!");
  return manufacturerLookupObj;
};
