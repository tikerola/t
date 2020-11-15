import express from "express";
import { Categories } from "../models/types/types";
import { productsController } from "./common/productsController";

const router = express.Router();

router.get(
  "/products/accessories/:page",
  productsController(Categories.accessories)
);

export { router as accessoryRouter };
