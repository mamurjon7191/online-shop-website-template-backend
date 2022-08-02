const colorRouter = require("express").Router();
const colorController = require("../controller/colorController");

colorRouter
  .route("/")
  .get(colorController.getAllColors)
  .post(colorController.addColor);

colorRouter
  .route("/:id")
  .get(colorController.getOneColor)
  .patch(colorController.updateColor)
  .delete(colorController.deleteColor);

module.exports = colorRouter;
