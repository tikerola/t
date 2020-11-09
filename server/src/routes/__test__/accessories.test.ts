import request from "supertest";
import { app } from "../../app";

describe("Testing accessories-route", () => {
  it("should respond with all three accessories when there is no filter and 10 products per page", async () => {
    const filter = "";
    const productsPerPage = 10;

    const response = await request(app)
      .get(`/products/accessories/1/?filter=${filter}&ppp=${productsPerPage}`)
      .expect(200);

    const { items, numOfItems } = response.body;

    expect(numOfItems).toBe(3);
    expect(items).toHaveLength(3);

    expect(items[0].availability).toEqual("IN STOCK");
    expect(items[1].availability).toEqual("OUT OF STOCK");
    expect(items[2].availability).toEqual("LESS THAN 10");
  });

  it("should respond with first two accessories when there is no filter and 2 products per page", async () => {
    const filter = "";
    const productsPerPage = 2;

    const response = await request(app)
      .get(`/products/accessories/1/?filter=${filter}&ppp=${productsPerPage}`)
      .expect(200);

    const { items, numOfItems } = response.body;

    expect(numOfItems).toBe(3);
    expect(items[0].id).toEqual("1");
    expect(items[0].availability).toEqual("IN STOCK");

    expect(items[1].id).toEqual("2");
    expect(items[1].availability).toEqual("OUT OF STOCK");
  });

  it("should respond with only the second shirt when filter=tw and 2 products per page", async () => {
    const filter = "tw";
    const productsPerPage = 2;

    const response = await request(app)
      .get(`/products/accessories/1/?filter=${filter}&ppp=${productsPerPage}`)
      .expect(200);

    const { items, numOfItems } = response.body;

    expect(numOfItems).toBe(1);
    expect(items).toHaveLength(1);
    expect(items[0].name).toEqual("two");
  });

  it("should respond with zero accessories when filter=asdf and 2 products per page", async () => {
    const filter = "asdf";
    const productsPerPage = 2;

    const response = await request(app)
      .get(`/products/accessories/1/?filter=${filter}&ppp=${productsPerPage}`)
      .expect(200);

    const { items, numOfItems } = response.body;

    expect(numOfItems).toBe(0);
    expect(items).toHaveLength(0);
  });
});
