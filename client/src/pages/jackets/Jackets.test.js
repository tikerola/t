import React from "react";
import { render, waitFor } from "../../test-utils";
import { Jackets } from "./Jackets";

import * as hooks from "../../hooks/useRequestData";

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

describe("<Jackets/>", () => {
  it("should match snapshot", async () => {
    const component = render(<Jackets />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should render spinner, when hook return an empty productData array", async () => {
    jest.spyOn(hooks, "useRequestData").mockImplementation(() => ({
      productData: [],
      numOfProducts: 0,
    }));
    const component = render(<Jackets />);
    const spinner = component.getByTestId("spinner");
    expect(spinner).toBeDefined();
  });

  it("should render a product", async () => {
    jest.spyOn(hooks, "useRequestData").mockImplementation(() => ({
      productData: [
        {
          id: "f33561de3a864f951a",
          type: "jackets",
          name: "EWHHOP ROOM",
          color: ["blue"],
          price: 52,
          manufacturer: "reps",
        },
      ],
      numOfProducts: 15,
    }));
    const component = render(<Jackets />);
    const title = component.getByText(/EWHHOP ROOM/i);
    const manufacturer = component.getByText("reps");

    expect(title).toBeDefined();
    expect(manufacturer).toBeDefined();
  });
});
