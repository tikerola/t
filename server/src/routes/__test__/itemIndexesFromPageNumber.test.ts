import { itemIndexesFromPageNumber } from "../common/itemIndexesFromPageNumber";

describe("itemIndexesFromPageNumber", () => {
  it("should return right start and end when not providing numberOfProducts", () => {
    const page = 3;

    const { start, end } = itemIndexesFromPageNumber(page);

    expect(start).toBe(20);
    expect(end).toBe(30);
  });
});
