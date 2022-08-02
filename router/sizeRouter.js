const sizeRouter = require("express").Router();
const sizeController = require("../controller/sizeController");

sizeRouter
  .route("/")
  .get(sizeController.getAllSizes)
  .post(sizeController.addSize);

sizeRouter
  .route("/:id")
  .get(sizeController.getOneSize)
  .patch(sizeController.updateSize)
  .delete(sizeController.deleteSize);

module.exports = sizeRouter;
