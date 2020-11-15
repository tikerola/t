import {
  AvailabilityLookupObject,
  ProductData,
  availabilityToString,
} from "../types/types";

export class ProductDataFetcher {
  private jackets: ProductData[] = [
    {
      id: "1",
      name: "one",
      manufacturer: "mOne",
      price: 1,
      type: "tOne",
    },
    {
      id: "2",
      name: "two",
      manufacturer: "mTwo",
      price: 2,
      type: "tTwo",
    },
    {
      id: "3",
      name: "three",
      manufacturer: "mThree",
      price: 3,
      type: "tThree",
    },
  ];

  private shirts: ProductData[] = [
    {
      id: "1",
      name: "one",
      manufacturer: "mOne",
      price: 1,
      type: "tOne",
    },
    {
      id: "2",
      name: "two",
      manufacturer: "mTwo",
      price: 2,
      type: "tTwo",
    },
    {
      id: "3",
      name: "three",
      manufacturer: "mThree",
      price: 3,
      type: "tThree",
    },
  ];

  private accessories: ProductData[] = [
    {
      id: "1",
      name: "one",
      manufacturer: "mOne",
      price: 1,
      type: "tOne",
    },
    {
      id: "2",
      name: "two",
      manufacturer: "mTwo",
      price: 2,
      type: "tTwo",
    },
    {
      id: "3",
      name: "three",
      manufacturer: "mThree",
      price: 3,
      type: "tThree",
    },
  ];

  private availabilityData: AvailabilityLookupObject = {
    "1": {
      availability: "INSTOCK",
      manufacturer: "derp",
    },
    "2": {
      availability: "OUTOFSTOCK",
      manufacturer: "noox",
    },
    "3": {
      availability: "LESSTHAN10",
      manufacturer: "wtf",
    },
  };

  getItems = (category: string): ProductData[] => {
    if (category === "jackets") return this.jackets;
    else if (category === "shirts") return this.shirts;
    else return this.accessories;
  };

  getAvailabilityData = (): AvailabilityLookupObject => {
    return this.availabilityData;
  };

  initializeData = (): Promise<void> =>
    new Promise((resolve, reject) => resolve());

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
