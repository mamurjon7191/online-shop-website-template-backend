const catchErrLittle = require("../utility/catchErrorLittle");
const Category = require("../model/categoryModel");
let categories;

const getHomePage = catchErrLittle(async (req, res, next) => {
  categories = await Category.find();
  res.status(200).render("home", {
    category: categories,
  });
});

const getShopPage = catchErrLittle(async (req, res, next) => {
  res.status(200).render("shop", {
    category: categories,
  });
});
const getShopDetailPage = catchErrLittle(async (req, res, next) => {
  res.status(200).render("shopDetail", {
    category: categories,
  });
});
const getCartPage = catchErrLittle(async (req, res, next) => {
  res.status(200).render("cart", {
    category: categories,
  });
});
const getContactPage = catchErrLittle(async (req, res, next) => {
  res.status(200).render("contact", {
    category: categories,
  });
});
const getCheckoutPage = catchErrLittle(async (req, res, next) => {
  res.status(200).render("checkout", {
    category: categories,
  });
});

module.exports = {
  getHomePage,
  getShopPage,
  getShopDetailPage,
  getCartPage,
  getContactPage,
  getCheckoutPage,
};
