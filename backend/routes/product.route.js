import express from "express";

import {
  deleteProducts,
  getProducts,
  postProducts,
  updateProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", postProducts);

router.delete("/:id", deleteProducts);

router.get("/", getProducts);

router.put("/:id", updateProducts);

export default router;
