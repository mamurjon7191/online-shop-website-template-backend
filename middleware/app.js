const express = require("express");
const path = require("path");
const cookie_parser = require("cookie-parser");
const AppError = require("../utility/AppError");
const errController = require("../controller/errController");

// --- Routes-----
const productRouter = require("../router/productRouter");
const colorRouter = require("../router/colorRouter");
const sizeRouter = require("../router/sizeRouter");
const saleRouter = require("../router/saleRouter");
const categoryRouter = require("../router/categoryRouter");
const viewRouter = require("../router/viewRouter");
const reviewRouter = require("../router/reviewRouter");

// --- Routes-----

const app = express();
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
// --- Routes for view-----

app.use("/", viewRouter);

app.all("*", (req, res, next) => {
  return next(new AppError("This page is not defined", 404));
});

app.use(errController);

module.exports = app;
