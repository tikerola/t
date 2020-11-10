import React from "react";
import { App } from "./App";
import { render } from "./test-utils";

describe("<App />", () => {
  it("should match snapshot", () => {
    const component = render(<App />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
