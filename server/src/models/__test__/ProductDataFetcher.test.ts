import axios from "axios";
jest.mock("axios");
const { ProductDataFetcher } = jest.requireActual("../ProductDataFetcher");

const productDataFetcher = new ProductDataFetcher();
console.log(productDataFetcher);

describe("ProductDataFetcher", () => {
  const response = {
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

  it("should test method fetchProductData", async () => {
    (axios.get as jest.Mock).mockResolvedValue(response);

    const pData = await productDataFetcher.fetchProductData("jackets");

    expect(axios.get).toHaveBeenCalledWith(
      "https://bad-api-assignment.reaktor.com/products/jackets"
    );

    expect(pData).toEqual(response.data);
  });
});
