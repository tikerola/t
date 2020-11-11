import React from "react";
import { render } from "../../test-utils";
import { RenderProductData } from "./RenderProductData";

const productData = [
  {
    id: "f33561de3a864f951a",
    type: "jackets",
    name: "EWHHOP ROOM",
    color: ["blue"],
    price: 52,
    manufacturer: "reps",
    availability: "IN STOCK",
  },
  {
    id: "0e4772c827c4296592fbd",
    type: "jackets",
    name: "WEERLEP METROPOLIS RAPTOR",
    color: ["black"],
    price: 98,
    manufacturer: "reps",
    availability: "OUT OF STOCK",
  },
  {
    id: "6d39a08b3bcae88a67",
    type: "jackets",
    name: "DERWEER TYRANNUS BANG",
    color: ["purple"],
    price: 15,
    manufacturer: "abiplos",
    availability: "LESS THAN 10",
  },
];

describe("<RenderProductData />", () => {
  it("should match snapshot", () => {
    const component = render(<RenderProductData productData={productData} />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should render productData", () => {
    const component = render(<RenderProductData productData={productData} />);

    const title1 = component.queryByText("EWHHOP ROOM");
    const title2 = component.queryByText("WEERLEP METROPOLIS RAPTOR");
    const title3 = component.queryByText("DERWEER TYRANNUS BANG");

    expect(title1).toBeDefined();
    expect(title2).toBeDefined();
    expect(title3).toBeDefined();

    const m1 = component.queryAllByText("reps");
    const m2 = component.queryByText("abiplos");

    expect(m1[0]).toBeDefined();
    expect(m1[1]).toBeDefined();
    expect(m2).toBeDefined();

    const a1 = component.queryByText("IN STOCK");
    const a2 = component.queryByText("OUT OF STOCK");
    const a3 = component.queryByText("LESS THAN 10");

    expect(a1).toBeDefined();
    expect(a2).toBeDefined();
    expect(a3).toBeDefined();

    const p1 = component.queryByText("52");
    const p2 = component.queryByText("98");
    const p3 = component.queryByText("15");

    expect(p1).toBeDefined();
    expect(p2).toBeDefined();
    expect(p3).toBeDefined();

    const colors = component.queryAllByTestId("color-button");
    expect(colors).toHaveLength(3);
  });
});
