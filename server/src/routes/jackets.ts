import express from "express";
import { Categories } from "../models/types/types";
import { productsController } from "./common/productsController";

const router = express.Router();

router.get("/products/jackets/:page", productsController(Categories.jackets));

export { router as jacketsRouter };
