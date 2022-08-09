const express = require("express");
const app = express();
const path = require("path");
const cookie_parser = require("cookie-parser");
const AppError = require("../utility/AppError");
const errController = require("../controller/errController");
const User = require("../model/userModel");

//----------
const jwt = require("jsonwebtoken");
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const saveTokenCookie = (res, token, req) => {
  // shu cookieni ishlashini sorimiz
  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: req.protocol === "https" ? true : false,
  });
};
const viewController = require("../controller/viewController");
const authController = require("../controller/authController");
//----------

app.use(cookie_parser());

//---Login in to with google

let userProfile;

const GOOGLE_CLIENT_ID =
  "1054066304408-autntra6d92fd2gneplbidk9k4lp9b4l.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const session = require("express-session");

const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5001/auth/google/callback",
      // passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback/",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/error",
  })
);

app.get(
  "/success",
  authController.isSign,
  async (req, res, next) => {
    if (!req.user) {
      console.log(req.user);
      const user = User({
        name: userProfile.given_name,
        email: userProfile.email,
      });

      await user.save({ validateBeforeSave: false });

      console.log(user);

      const token = createToken(user._id);

      saveTokenCookie(res, token, req);

      console.log(token);

      res.locals.userData = user;

      next();
    } else {
      next();
    }
  },
  viewController.getHomePage
);

app.get("/error", (req, res) => res.render("sign-up"));

//---Login in to with google

// --- Routes-----
const productRouter = require("../router/productRouter");
const colorRouter = require("../router/colorRouter");
const sizeRouter = require("../router/sizeRouter");
const saleRouter = require("../router/saleRouter");
const categoryRouter = require("../router/categoryRouter");
const viewRouter = require("../router/viewRouter");
const reviewRouter = require("../router/reviewRouter");
const userRouter = require("../router/userRouter");
const { getHomePage } = require("../controller/viewController");
// --- Routes-----

app.use(express.json({ limit: "10kb" })); // midleware
app.use(express.static("public"));

app.use(cookie_parser());

app.set("view engine", "pug");

app.set("views", "view");

// --- Routes for api-----

app.use("/api/v1/products", productRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/sizes", sizeRouter);
app.use("/api/v1/sales", saleRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", userRouter);
// --- Routes for view-----

app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  return next(new AppError("This page is not defined", 404));
});

app.use(errController);

module.exports = app;
