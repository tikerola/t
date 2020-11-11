import React from "react";
import * as hooks from "../../hooks/useRequestData";
import { render } from "../../test-utils";
import { Accessories } from "./Accessories";

const productData = [
  {
    id: "f33561de3a864f951a",
    type: "Accessories",
    name: "EWHHOP ROOM",
    color: ["blue"],
    price: 52,
    manufacturer: "reps",
  },
  {
    id: "0e4772c827c4296592fbd",
    type: "Accessories",
    name: "WEERLEP METROPOLIS RAPTOR",
    color: ["black"],
    price: 98,
    manufacturer: "reps",
  },
  {
    id: "6d39a08b3bcae88a67",
    type: "Accessories",
    name: "DERWEER TYRANNUS BANG",
    color: ["purple"],
    price: 15,
    manufacturer: "abiplos",
  },
];

describe("<Accessories/>", () => {
  it("should match snapshot", async () => {
    const component = render(<Accessories />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should render spinner, when hook return an empty productData array", async () => {
    jest.spyOn(hooks, "useRequestData").mockImplementation(() => ({
      productData: [],
      numOfProducts: 0,
    }));
    const component = render(<Accessories />);
    const spinner = component.getByTestId("spinner");
    expect(spinner).toBeDefined();
  });

  it("should render a product", async () => {
    jest.spyOn(hooks, "useRequestData").mockImplementation(() => ({
      productData: [
        {
          id: "f33561de3a864f951a",
          type: "Accessories",
          name: "EWHHOP ROOM",
          color: ["blue"],
          price: 52,
          manufacturer: "reps",
        },
      ],
      numOfProducts: 15,
    }));
    const component = render(<Accessories />);
    const title = component.getByText(/EWHHOP ROOM/i);
    const manufacturer = component.getByText("reps");

    expect(title).toBeDefined();
    expect(manufacturer).toBeDefined();
  });
});
