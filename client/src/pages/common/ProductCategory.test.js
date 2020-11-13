import React from "react";
import { render, fireEvent } from "../../test-utils";
import { ProductCategory } from "./ProductCategory";
import userEvent from "@testing-library/user-event";

jest.mock("./constants", () => ({
  PRODUCTS_PER_PAGE: 2,
}));

const productData = [
  {
    id: "f33561de3a864f951a",
    type: "jackets",
    name: "EWHHOP ROOM",
    color: ["blue"],
    price: 52,
    manufacturer: "reps",
  },
  {
    id: "0e4772c827c4296592fbd",
    type: "jackets",
    name: "WEERLEP METROPOLIS RAPTOR",
    color: ["black"],
    price: 98,
    manufacturer: "reps",
  },
  {
    id: "6d39a08b3bcae88a67",
    type: "jackets",
    name: "DERWEER TYRANNUS BANG",
    color: ["purple"],
    price: 15,
    manufacturer: "abiplos",
  },
];

describe("<ProductCategory/>", () => {
  it("should match snapshot", async () => {
    const setPageMock = jest.fn();
    const setFilterMock = jest.fn();
    const component = render(
      <ProductCategory
        title="Jackets"
        page={1}
        setPage={setPageMock}
        setFilter={setFilterMock}
        numOfProducts={3}
        productData={productData}
      />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it("should test filter input", async () => {
    const setPageMock = jest.fn();
    const setFilterMock = jest.fn();
    const component = render(
      <ProductCategory
        title="Jackets"
        page={1}
        setPage={setPageMock}
        setFilter={setFilterMock}
        numOfProducts={3}
        productData={productData}
      />
    );

    const input = component.queryByPlaceholderText(/Filter by Name/i);
    userEvent.type(input, "hello");

    expect(setFilterMock).toHaveBeenCalledWith("hello");
    expect(setFilterMock).toHaveBeenCalledTimes(5);
  });

  it("should render pagination when productData exists", async () => {
    const setPageMock = jest.fn();
    const setFilterMock = jest.fn();
    const component = render(
      <ProductCategory
        title="Jackets"
        page={1}
        setPage={setPageMock}
        setFilter={setFilterMock}
        numOfProducts={3}
        productData={productData}
      />
    );

    const next = component.queryByText("Next >>");
    expect(next).toBeDefined();
  });

  it("should not render pagination when productData is empty", async () => {
    const setPageMock = jest.fn();
    const setFilterMock = jest.fn();
    const component = render(
      <ProductCategory
        title="Jackets"
        page={1}
        setPage={setPageMock}
        setFilter={setFilterMock}
        numOfProducts={3}
        productData={[]}
      />
    );

    const next = component.queryByText("Next >>");
    expect(next).not.toBeTruthy();

    const noMatchesFound = component.queryByText("No Matches Found!");
    expect(noMatchesFound).toBeDefined();
  });

  it("should be able to change next and previous page only when appropriate", async () => {
    const setPageMock = jest.fn();
    const setFilterMock = jest.fn();
    const component = render(
      <ProductCategory
        title="Jackets"
        page={1}
        setPage={setPageMock}
        setFilter={setFilterMock}
        numOfProducts={3}
        productData={productData}
      />
    );

    const next = component.queryByText("Next >>");
    const previous = component.queryByText("<< Prev");

    let paginationText = component.queryByText("1 - 2 / 3");
    expect(paginationText).toBeDefined();

    fireEvent.click(previous);
    paginationText = component.queryByText("1 - 2 / 3");
    expect(paginationText).toBeDefined();

    expect(setPageMock).not.toHaveBeenCalled();

    fireEvent.click(next);
    paginationText = component.queryByText("3 - 3 / 3");
    expect(paginationText).toBeDefined();

    component.rerender(
      <ProductCategory
        title="Jackets"
        page={2}
        setPage={setPageMock}
        setFilter={setFilterMock}
        numOfProducts={3}
        productData={productData}
      />
    );

    fireEvent.click(next);
    paginationText = component.queryByText("3 - 3 / 3");
    expect(paginationText).toBeDefined();

    fireEvent.click(previous);

    paginationText = component.queryByText("1 - 2 / 3");
    expect(paginationText).toBeDefined();

    expect(setPageMock).toHaveBeenCalledTimes(2);
  });
});
