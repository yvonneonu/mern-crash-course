//controllers/user.controller.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
//import passport from "passport";

//Generate JWT token

// export const generateToken = (user) => {
//   return jwt.sign(
//     { _id: user._id, username: user.username },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
//   );
// };

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          // isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Login User
export const loginUser = async (req, res, next) => {
  // passport.authenticate("login", (err, user, info) => {
  //   try {
  //     if (err) {
  //       return next(new Error("An error occurred."));
  //     }
  //     if (!user) {
  //       return res.status(401).json({ success: false, message: info.message });
  //     }
  //     req.login(user, (err) => {
  //       if (err) return next(err);
  //       const body = { email: user.email, password: user.password };
  //       const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
  //         expiresIn: "1d",
  //       });

  //       return res.json({
  //         token,
  //         body,
  //       });
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ success: false, message: error.message });
  //   }
  // })(req, res, next);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          // isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          // isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
