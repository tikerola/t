import React from "react";
import * as hooks from "../../hooks/useRequestData";
import { render } from "../../test-utils";
import { Shirts } from "./Shirts";

describe("<Shirts/>", () => {
  it("should match snapshot", async () => {
    const component = render(<Shirts />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should render spinner, when hook return an empty productData array", async () => {
    jest.spyOn(hooks, "useRequestData").mockImplementation(() => ({
      productData: [],
      numOfProducts: 0,
    }));
    const component = render(<Shirts />);
    const spinner = component.getByTestId("spinner");
    expect(spinner).toBeDefined();
  });

  it("should render a product", async () => {
    jest.spyOn(hooks, "useRequestData").mockImplementation(() => ({
      productData: [
        {
          id: "f33561de3a864f951a",
          type: "Shirts",
          name: "EWHHOP ROOM",
          color: ["blue"],
          price: 52,
          manufacturer: "reps",
        },
      ],
      numOfProducts: 15,
    }));
    const component = render(<Shirts />);
    const title = component.getByText(/EWHHOP ROOM/i);
    const manufacturer = component.getByText("reps");

    expect(title).toBeDefined();
    expect(manufacturer).toBeDefined();
  });
});
