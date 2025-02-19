import express from "express";
import passport from "../config/passport.js";
import { generateToken } from "../controllers/user.controller.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Helper function to get frontend URL
const getFrontendURL = () => {
  // In production, always use the Render URL
  if (process.env.NODE_ENV === "production") {
    return "https://mern-crash-course-zgcv.onrender.com";
  }
  // In development, use the local URL
  return "http://localhost:5173";
};

// Log the current environment and URL
console.log("Current environment:", process.env.NODE_ENV);
console.log("Frontend URL:", getFrontendURL());

//Google Auth Routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

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

      const frontendURL = getFrontendURL();
      console.log("Redirecting to:", `${frontendURL}?token=${token}`);
      res.redirect(`${frontendURL}?token=${token}`);
    } catch (error) {
      console.error("Facebook callback error:", error);
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

      const frontendURL = getFrontendURL();
      console.log("Redirecting to:", `${frontendURL}?token=${token}`);
      res.redirect(`${frontendURL}?token=${token}`);
    } catch (error) {
      console.error("Google callback error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Debug route to check environment variables

export default router;
