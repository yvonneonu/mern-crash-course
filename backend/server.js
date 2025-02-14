//server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import authRoutes from "./routes/auth.route.js";
import passport from "passport";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); ///midlleware
app.use(cookieParser()); ///middleware)
app.use(
  session({
    secret: process.env.SECRET_KEY || "my session secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/auth", authRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port " + PORT);
});

//setuq9wTGo6NKAmB
