const productRouter = require("express").Router();
const productController = require("../controller/productController");

productRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct);

productRouter
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = productRouter;
