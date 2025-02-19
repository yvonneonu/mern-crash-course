//config/passport.js
import passport from "passport";
import { Strategy as InstagramStrategy } from "passport-instagram";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND}/api/auth/google/callback`,
      // scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);

      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          return done(null, user);
        }

        // If user doesn't exist, create a new one
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          password: profile.id, // Using profile ID as password for OAuth users
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Instagram Strategy
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND}/api/auth/instagram/callback`,
      // scope: ["public_content", "likes", "comments", "relationships"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      // try {
      //   let user = await User.findOne({
      //     email: `${profile.username}@instagram.com`,
      //   });

      //   if (user) {
      //     return done(null, user);
      //   }

      //   // If user doesn't exist, create a new one
      //   user = await User.create({
      //     name: profile.displayName || profile.username,
      //     email: `${profile.username}@instagram.com`,
      //     password: profile.id, // Using profile ID as password for OAuth users
      //     // instagramId: profile.id,
      //   });

      //   return done(null, user);
      // } catch (error) {
      //   return done(error, null);
      // }
    }
  )
);

export default passport;
