import React from "react";
import { render } from "../../test-utils";
import { Menu } from "./Menu";

describe("<Menu />", () => {
  it("should match snapshot", async () => {
    const component = render(<Menu />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
