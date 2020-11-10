import React from "react";
import axios from "axios";
import { renderHook } from "@testing-library/react-hooks";
import { useRequestData } from "./useRequestData";

jest.mock("axios");

describe("useRequestData", () => {
  const productData = [
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
    {
      id: "6d39a08b3bcae88a67",
      type: "jackets",
      name: "DERWEER TYRANNUS BANG",
      color: ["purple"],
      price: 15,
      manufacturer: "abiplos",
    },
  ];

  const data = {
    data: {
      items: productData,
      numOfItems: 15,
    },
  };

  it("should return productData and number of products", async () => {
    axios.get.mockResolvedValue(data);
    const url = "something";
    let page = 1;
    let filter = "";

    const { result, waitForNextUpdate } = renderHook(() =>
      useRequestData({ url, dependencies: [page, filter] })
    );

    await waitForNextUpdate();
    expect(result.current.productData).toEqual(productData);
    expect(result.current.numOfProducts).toBe(15);
  });
});
