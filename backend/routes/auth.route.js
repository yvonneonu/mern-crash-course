import express from "express";
import passport from "passport";
import { generateToken } from "../controllers/user.controller.js";

const router = express.Router();

// Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.PORT}?token=${token}`);
  }
);

// Instagram Auth Routes
router.get("/instagram", passport.authenticate("instagram"));

router.get(
  "/instagram/callback",
  passport.authenticate("instagram", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.PORT}?token=${token}`);
  }
);

export default router;
