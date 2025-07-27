// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const User = require("./models/User");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const PasswordRouter = require("./routes/authRoutes");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router");

// Database connection using Mongoose
const { connectdb } = require("./ConnectionDb");
connectdb();

// Initialize Express app
const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration for local development
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust for your frontend
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Load Passport strategies configuration
require("./config/passport");

// Local authentication strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes for authentication and user management
app.use("/password", PasswordRouter);

// Google OAuth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("http://localhost:3000/home"); // Redirect to your frontend
  }
);

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.findOne({ email });

    if (user) {
      if (user.googleId && user.password) {
        return res.status(400).json({ message: "User already exists" });
      }
      if (!user.googleId && user.password) {
        return res.status(400).json({ message: "User already exists" });
      }
      if (user.googleId && !user.password) {
        user.password = hashedPassword;
        await user.save();
      }
    } else {
      user = new User({ username, email, password: hashedPassword });
      await user.save();
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Error logging in user after registration:", err);
        return res.status(500).send("Internal server error");
      }
      return res.status(200).json({
        message: "Registered and logged in successfully",
        user,
      });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).send("Registration failed");
  }
});

// Login endpoint
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

// Logout endpoint
app.get("/auth/logout", function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error logging out" });
    }
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error destroying session" });
      }
      res.json({ message: "Logout successful" });
    });
  });
});

// Fetch user profile
app.get("/api/user/profile", async (req, res) => {
  try {
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Connect to MongoDB and set up shares router
MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("portfolio");
    const sharesCollection = db.collection("shares");
    const sharesRouter = createRouter(sharesCollection);
    app.use("/api/shares", sharesRouter);
    console.log("MongoDB Connection Established for User_portfolio!!!");
  })
  .catch(console.error);

// // Serve static files
// app.use(express.static(path.join(__dirname, "../client/build")));

// // Catch-all route to serve React app
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "../client/build/index.html"))
// );

// Start server
const Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log(`\nServer is Running at http://localhost:${Port}`);
});
