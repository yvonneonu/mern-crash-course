//routes/auth.route.js
import express from "express";
import passport from "../config/passport.js";
import { generateToken } from "../controllers/user.controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? process.env.FRONTEND_URL // Replace with your local frontend URL
    : "https://mern-crash-course-zgcv.onrender.com";

//Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

//hand book

console.log("process.env.FRONTEND_URL", FRONTEND_URL);
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

      res.redirect(`${FRONTEND_URL}?token=${token}`);
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

      res.redirect(`${FRONTEND_URL}?token=${token}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
