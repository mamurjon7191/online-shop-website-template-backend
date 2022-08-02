const Category = require("../model/categoryModel");

const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require("./handlerController");

const options1 = {
  path: "products",
};

const getAllCategories = (req, res, next) => {
  console.log("getAllCategories ga kirdi");
  getAll(req, res, next, Category, options1);
};

const getOneCategory = (req, res, next, options1) => {
  getOne(req, res, next, Category, options1);
};

const addCategory = (req, res, next) => {
  add(req, res, next, Category);
};
const updateCategory = (req, res, next) => {
  update(req, res, next, Category);
};
const deleteCategory = (req, res, next) => {
  deleteData(req, res, next, Category);
};

module.exports = {
  getAllCategories,
  getOneCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
