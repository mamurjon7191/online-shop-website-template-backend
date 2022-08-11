const express = require("express");
const app = express();
const path = require("path");
const cookie_parser = require("cookie-parser");
const AppError = require("../utility/AppError");
const errController = require("../controller/errController");

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

//----------

app.use(cookie_parser());

//---Login in to with google
const passport = require("../passport/passport");
const session = require("express-session");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback/",
  passport.authenticate("google", {
    failureRedirect: "/error",
  }),
  function (req, res) {
    console.log("user", req.user);
    const token = createToken(req.user.userId);
    saveTokenCookie(res, token, req);
    res.redirect("/success");
  }
);

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
