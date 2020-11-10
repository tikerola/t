import React from "react";
import { render } from "@testing-library/react";
import { Shirts } from "./Shirts";

describe("<Shirts/>", () => {
  it("should match snapshot", async () => {
    const component = render(<Shirts />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
