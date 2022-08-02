const Product = require("../model/productModel");
const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require("./handlerController");

const options1 = {
  path: "colorId",
};
const options2 = {
  path: "sizeId",
};
const options3 = {
  path: "saleId",
};

const getAllProducts = (req, res, next) => {
  getAll(req, res, next, Product, options1, options2, options3);
};

const getOneProduct = (req, res, next) => {
  getOne(req, res, next, Product, options1, options2, options3);
};

const addProduct = (req, res, next) => {
  add(req, res, next, Product);
};
const updateProduct = (req, res, next) => {
  update(req, res, next, Product);
};
const deleteProduct = (req, res, next) => {
  deleteData(req, res, next, Product);
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
