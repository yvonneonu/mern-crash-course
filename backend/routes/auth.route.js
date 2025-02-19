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

//hand book

// //facebook routes
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", {
//     scope: ["email"],
//   })
// );

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   (req, res) => {
//     try {
//       const body = {
//         _id: req.user._id,
//         name: req.user.name,
//         email: req.user.email,
//       };
//       const token = jwt.sign(body, process.env.JWT_SECRET, {
//         expiresIn: "30d",
//       });
//       console.log(token);

//       res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

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
      // Check if the environment is local or production
      const frontendUrl =
        process.env.NODE_ENV === "production"
          ? "https://mern-crash-course-zgcv.onrender.com"
          : process.env.FRONTEND_URL;

      res.redirect(`${frontendUrl}?token=${token}`);

      // res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;
