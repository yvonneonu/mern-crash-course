//routes/user.route.js
import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);

export default router;
