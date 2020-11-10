import React from "react";
import { render } from "@testing-library/react";
import { Accessories } from "./Accessories";

describe("<Accessories/>", () => {
  it("should match snapshot", async () => {
    const component = render(<Accessories />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
