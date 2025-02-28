//routes/auth.route.js
import express from "express";
import passport from "../config/passport.js";
import { generateToken } from "../controllers/user.controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();
console.log("FRONTEND_URL from env:", process.env.FRONTEND_URL);

//Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

//hand book

//facebook routes
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    try {
      const body = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      };
      const token = jwt.sign(body, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
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
        expiresIn: "1d",
      });
      // res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);

      res.redirect(`${process.env.URL}?token=${token}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
