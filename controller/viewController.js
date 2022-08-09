const catchErrLittle = require("../utility/catchErrorLittle");
const Category = require("../model/categoryModel");

const { getOne } = require("./handlerController");
const Product = require("../model/productModel");
const Sale = require("../model/saleModel");

const getHomePage = catchErrLittle(async (req, res, next) => {
  let categories = await Category.find().populate({
    path: "products",
  });
  const sale = await Sale.find();
  res.status(200).render("home", {
    category: categories,
    sale,
  });
});

const getShopPage = catchErrLittle(async (req, res, next) => {
  let categories = await Category.find();

  const categoryOne = await Category.findById(req.query.id).populate({
    path: "products",
  });

  const sales = await Sale.find();

  res.status(200).render("shop", {
    category: categories,
    categoryOne: categoryOne.products,
    sales: sales,
  });
});
const getShopDetailPage = catchErrLittle(async (req, res, next) => {
  let categories = await Category.find();

  res.status(200).render("shopDetail", {
    category: categories,
  });
});
const getCartPage = catchErrLittle(async (req, res, next) => {
  let categories = await Category.find();

  res.status(200).render("cart", {
    category: categories,
  });
});
const getContactPage = catchErrLittle(async (req, res, next) => {
  let categories = await Category.find();

  res.status(200).render("contact", {
    category: categories,
  });
});
const getCheckoutPage = catchErrLittle(async (req, res, next) => {
  let categories = await Category.find();

  res.status(200).render("checkout", {
    category: categories,
  });
});

const getLoginPage = catchErrLittle(async (req, res, next) => {
  res.status(200).render("login");
});
const getSignUpPage = catchErrLittle(async (req, res, next) => {
  res.status(200).render("sign-up");
});

const logout = catchErrLittle(async (req, res, next) => {
  console.log("1");
  res.cookie("jwt", "logout", {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: req.protocol === "https" ? true : false,
  });
  res.status(200).json({
    status: "success",
  });
});

// const getShopPage = catchErrLittle(async (req, res, next) => {
//   const categoryOne = await Category.findById(req.query.id).populate({
//     path: "products",
//   });
//   console.log(categoryOne.products);
//   res.status(200).json({
//     data: categoryOne,
//   });
// });

module.exports = {
  logout,
  getHomePage,
  getShopPage,
  getShopDetailPage,
  getCartPage,
  getContactPage,
  getCheckoutPage,
  getLoginPage,
  getSignUpPage,
};
