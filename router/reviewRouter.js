const reviewRouter = require("express").Router();
const reviewController = require("../controller/reviewController");

reviewRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(reviewController.addReview);

reviewRouter
  .route("/:id")
  .get(reviewController.getOneReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = reviewRouter;
