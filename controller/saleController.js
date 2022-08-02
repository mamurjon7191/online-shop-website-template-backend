const Sale = require("../model/saleModel");

const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require("./handlerController");

const getAllSales = (req, res, next) => {
  getAll(req, res, next, Sale);
};

const getOneSale = (req, res, next) => {
  getOne(req, res, next, Sale);
};

const addSale = (req, res, next) => {
  add(req, res, next, Sale);
};
const updateSale = (req, res, next) => {
  update(req, res, next, Sale);
};
const deleteSale = (req, res, next) => {
  deleteData(req, res, next, Sale);
};

module.exports = {
  getAllSales,
  getOneSale,
  addSale,
  updateSale,
  deleteSale,
};
