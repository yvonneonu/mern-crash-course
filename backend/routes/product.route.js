//product.route.js
import express from "express";

import {
  deleteProducts,
  getProducts,
  postProducts,
  updateProducts,
} from "../controllers/product.controller.js";
import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, admin, postProducts);

router.delete("/:id", protect, admin, deleteProducts);

router.get("/", getProducts);

router.put("/:id", protect, admin, updateProducts);

export default router;
