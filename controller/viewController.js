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
  console.log(sale);
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
  getHomePage,
  getShopPage,
  getShopDetailPage,
  getCartPage,
  getContactPage,
  getCheckoutPage,
};
