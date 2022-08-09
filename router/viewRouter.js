const viewRouter = require("express").Router();

const viewController = require("../controller/viewController");

viewRouter.route("/home").get(viewController.getHomePage);
viewRouter.route("/shopDetail").get(viewController.getShopDetailPage);
viewRouter.route("/cart").get(viewController.getCartPage);
viewRouter.route("/contact").get(viewController.getContactPage);
viewRouter.route("/checkout").get(viewController.getCheckoutPage);
viewRouter.route("/shop").get(viewController.getShopPage);

viewRouter.route("/login").get(viewController.getLoginPage);
viewRouter.route("/sign-up").get(viewController.getSignUpPage);

viewRouter.route("/logout").get(viewController.logout);

module.exports = viewRouter;
