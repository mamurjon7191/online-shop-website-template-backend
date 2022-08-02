const saleRouter = require("express").Router();
const saleController = require("../controller/saleController");

saleRouter
  .route("/")
  .get(saleController.getAllSales)
  .post(saleController.addSale);

saleRouter
  .route("/:id")
  .get(saleController.getOneSale)
  .patch(saleController.updateSale)
  .delete(saleController.deleteSale);

module.exports = saleRouter;
