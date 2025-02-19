//routes/auth.route.js
import express from "express";
import passport from "../config/passport.js";
import { generateToken } from "../controllers/user.controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      const body = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      };
      const token = jwt.sign(body, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      console.log(token);

      res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Instagram Auth Routes
router.get(
  "/instagram",
  passport.authenticate("instagram", {
    scope: ["instagram_business_basic"],
  })
);

// Instagram Callback Route
router.get(
  "/instagram/callback",
  passport.authenticate("instagram", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("Success", req.user);
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

export default router;
