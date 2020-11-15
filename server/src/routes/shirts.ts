import express from "express";
import { Categories } from "../models/types/types";
import { productsController } from "./common/productsController";
const router = express.Router();

router.get("/products/shirts/:page", productsController(Categories.shirts));

export { router as shirtsRouter };
