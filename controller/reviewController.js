const Review = require("../model/reviewModel");

const {
  getAll,
  getOne,
  add,
  update,
  deleteData,
} = require("./handlerController");

const getAllReviews = (req, res, next) => {
  getAll(req, res, next, Review);
};

const getOneReview = (req, res, next) => {
  getOne(req, res, next, Review);
};

const addReview = (req, res, next) => {
  add(req, res, next, Review);
};
const updateReview = (req, res, next) => {
  update(req, res, next, Review);
};
const deleteReview = (req, res, next) => {
  deleteData(req, res, next, Review);
};

module.exports = {
  getAllReviews,
  getOneReview,
  addReview,
  updateReview,
  deleteReview,
};
