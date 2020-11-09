import axios from "axios";
import { Categories, Manufacturers } from "../types/types";
jest.mock("axios");
const { ProductDataFetcher } = jest.requireActual("../ProductDataFetcher");

const jResponse = {
  data: [
    {
      id: "f33561de3a864f951a",
      type: "jackets",
      name: "EWHHOP ROOM",
      color: ["blue"],
      price: 52,
      manufacturer: "reps",
    },
    {
      id: "0e4772c827c4296592fbd",
      type: "jackets",
      name: "WEERLEP METROPOLIS RAPTOR",
      color: ["black"],
      price: 98,
      manufacturer: "reps",
    },
  ],
};

const sResponse = {
  data: [
    {
      id: "f8016f8e3897cbd129ec0fde",
      type: "shirts",
      name: "NYXBE BRIGHT METROPOLIS",
      color: ["yellow"],
      price: 44,
      manufacturer: "derp",
    },
    {
      id: "a9262d3e27a19f6b9de",
      type: "shirts",
      name: "HUNKOX RAIN",
      color: ["black"],
      price: 56,
      manufacturer: "abiplos",
    },
  ],
};

const aResponse = {
  data: [
    {
      id: "44ca535c73191c7cd81",
      type: "accessories",
      name: "XIUONI STRONG",
      color: ["red"],
      price: 13,
      manufacturer: "xoon",
    },
    {
      id: "0f44a038ae52b42c9cb1",
      type: "accessories",
      name: "OPIEWH FANTASY",
      color: ["red", "purple"],
      price: 85,
      manufacturer: "reps",
    },
  ],
};

const availabilityResponse1 = {
  data: {
    code: 200,
    response: [
      {
        id: "F33561DE3A864F951A",
        DATAPAYLOAD:
          "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>",
      },
    ],
  },
};
const availabilityResponse2 = {
  data: {
    code: 200,
    response: [
      {
        id: "D9FE8BA212795CBA3914DD",
        DATAPAYLOAD:
          "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>",
      },
    ],
  },
};
const availabilityResponse3 = {
  data: {
    code: 200,
    response: [
      {
        id: "6D39A08B3BCAE88A67",
        DATAPAYLOAD:
          "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>",
      },
    ],
  },
};
const availabilityResponse4 = {
  data: {
    code: 200,
    response: [
      {
        id: "30D2D9F3851621D5A3CD9",
        DATAPAYLOAD:
          "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>",
      },
    ],
  },
};
const availabilityResponse5 = {
  data: {
    code: 200,
    response: [
      {
        id: "76EC839DA3EF71CE0F936",
        DATAPAYLOAD:
          "<AVAILABILITY>\n  <INSTOCKVALUE>INSTOCK</INSTOCKVALUE>\n</AVAILABILITY>",
      },
    ],
  },
};

describe("ProductDataFetcher", () => {
  it("should test method fetchProductData", async () => {
    const productDataFetcher = new ProductDataFetcher();
    (axios.get as jest.Mock).mockResolvedValue(jResponse);

    const pData = await productDataFetcher.fetchProductData(Categories.jackets);

    expect(axios.get).toHaveBeenCalledWith(
      "https://bad-api-assignment.reaktor.com/products/jackets"
    );

    expect(pData).toEqual(jResponse.data);
  });

  it("should test method initializeProductData", async () => {
    const productDataFetcher = new ProductDataFetcher();

    (axios.get as jest.Mock).mockResolvedValue(jResponse);
    await productDataFetcher.initializeProductData();
    const jackets = productDataFetcher.getJackets();

    (axios.get as jest.Mock).mockResolvedValue(sResponse);
    await productDataFetcher.initializeProductData();
    const shirts = productDataFetcher.getShirts();

    (axios.get as jest.Mock).mockResolvedValue(aResponse);
    await productDataFetcher.initializeProductData();
    const accessories = productDataFetcher.getAccessories();

    expect(jackets).toEqual(jResponse.data);
    expect(shirts).toEqual(sResponse.data);
    expect(accessories).toEqual(aResponse.data);
  });

  it("should test method fetchAvailabilityData", async () => {
    const productDataFetcher = new ProductDataFetcher();
    (axios.get as jest.Mock).mockResolvedValue(availabilityResponse1);

    const availabilityData = await productDataFetcher.fetchAvailabilityData(
      Manufacturers.reps
    );

    expect(axios.get).toHaveBeenCalledWith(
      "https://bad-api-assignment.reaktor.com/availability/reps"
    );

    expect(availabilityData).toEqual(availabilityResponse1.data);
  });

  it("should test method initializeAvailabilityData", async () => {
    const productDataFetcher = new ProductDataFetcher();
    (axios.get as jest.Mock)
      .mockResolvedValueOnce(availabilityResponse1)
      .mockResolvedValueOnce(availabilityResponse2)
      .mockResolvedValueOnce(availabilityResponse3)
      .mockResolvedValueOnce(availabilityResponse4)
      .mockResolvedValueOnce(availabilityResponse5);

    await productDataFetcher.initializeAvailabilityData();
    const data = productDataFetcher.getAvailabilityData();

    expect(data).toEqual({
      F33561DE3A864F951A: { availability: "IN STOCK", manufacturer: "reps" },
      D9FE8BA212795CBA3914DD: {
        availability: "IN STOCK",
        manufacturer: "derp",
      },

      "6D39A08B3BCAE88A67": {
        availability: "IN STOCK",
        manufacturer: "abiplos",
      },
      "30D2D9F3851621D5A3CD9": {
        availability: "IN STOCK",
        manufacturer: "xoon",
      },
      "76EC839DA3EF71CE0F936": {
        availability: "IN STOCK",
        manufacturer: "nouke",
      },
    });
  });

  it("should test method extractAvailability", async () => {
    const productDataFetcher = new ProductDataFetcher();
    const availability = productDataFetcher.extractAvailability(
      "<AVAILABILITY>\n  <INSTOCKVALUE>OUTOFSTOCK</INSTOCKVALUE>\n</AVAILABILITY>"
    );

    expect(availability).toEqual("OUT OF STOCK");
  });
});
