import React from "react";
import { render } from "@testing-library/react";
import { Jackets } from "./Jackets";

describe("<Jackets/>", () => {
  it("should match snapshot", async () => {
    const component = render(<Jackets />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
