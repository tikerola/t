import React from "react";
import { render } from "@testing-library/react";
import { Home } from "./Home";

describe("<Home />", () => {
  it("should render content", async () => {
    const component = render(<Home />);

    const title = component.queryByText(/Accessory Paradise/i);

    expect(title).toBeTruthy();
  });
});
