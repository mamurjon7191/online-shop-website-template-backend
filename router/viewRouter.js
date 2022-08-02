const viewRouter = require("express").Router();

const viewController = require("../controller/viewController");

viewRouter.route("/home").get(viewController.getHomePage);
viewRouter.route("/shop").get(viewController.getShopPage);
viewRouter.route("/shopDetail").get(viewController.getShopDetailPage);
viewRouter.route("/cart").get(viewController.getCartPage);
viewRouter.route("/contact").get(viewController.getContactPage);
viewRouter.route("/checkout").get(viewController.getCheckoutPage);

module.exports = viewRouter;
