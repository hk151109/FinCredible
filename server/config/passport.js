const passport = require("passport");
const User = require("../models/User");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback", // Local callback
      scope: ["profile", "email", "displayName"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user with the same email already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // If the user exists, update their Google ID and profile information
          user.googleId = profile.id;
          user.username = profile.displayName;
          user.profilePicture = profile.photos[0].value;
          await user.save();
          return done(null, user);
        } else {
          // If the user doesn't exist, create a new user
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
          });

          user = await newUser.save();
          return done(null, user);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
