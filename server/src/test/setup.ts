import { server } from "../..";
import { app } from "../app";

import { ProductDataFetcher } from "../models/ProductDataFetcher";
jest.mock("../models/ProductDataFetcher");
beforeAll(function (done) {
  app.on("appStarted", function () {
    console.log("starting test server");
    done();
  });
  //done();
});

afterAll((done) => {
  server?.close();
  done();
});
