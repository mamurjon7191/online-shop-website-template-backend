const categoryRouter = require("express").Router();
const categoryController = require("../controller/categoryController");

categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.addCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getOneCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = categoryRouter;
