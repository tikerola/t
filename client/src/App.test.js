import React from "react";
import { App } from "./App";
import { render, fireEvent } from "./test-utils";

describe("<App />", () => {
  const resizeWindow = (width, height) => {
    global.innerWidth = width;
    global.innerHeight = height;
    global.dispatchEvent(new Event("resize"));
  };

  it("should match snapshot", () => {
    const component = render(<App />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should show burger, when width < theme.smallPad", () => {
    resizeWindow(500, 500);

    const component = render(<App />);

    const burger = component.queryByTestId("burger");
    expect(burger).toBeTruthy();
  });

  it("should open menu after pressing burger", async () => {
    const component = render(<App />);

    const burger = component.getByTestId("burger");
    fireEvent.click(burger);

    expect(component.queryByText(/home/i)).toBeTruthy();

    const accessories = component.getAllByText(/accessories/i);
    fireEvent.click(accessories[0]);

    expect(component.queryByText(/accessory paradise/i)).not.toBeTruthy();

    expect(component.queryByTestId(/spinner/i)).toBeTruthy();

    fireEvent.click(burger);
    const home = component.queryByText(/home/i);
    fireEvent.click(home);
    expect(component.queryByText(/accessory paradise/i)).toBeTruthy();

    fireEvent.click(burger);
    fireEvent.click(home);

    fireEvent.click(burger);
    const jackets = component.queryAllByText(/jackets/i);
    fireEvent.click(jackets[0]);
    expect(component.queryByText(/accessory paradise/i)).not.toBeTruthy();

    fireEvent.click(burger);
    fireEvent.click(home);

    fireEvent.click(burger);
    const shirts = component.queryAllByText(/shirts/i);
    fireEvent.click(shirts[0]);
    expect(component.queryByText(/accessory paradise/i)).not.toBeTruthy();
  });
});
