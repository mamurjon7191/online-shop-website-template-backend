const viewRouter = require("express").Router();

const authController = require("../controller/authController");

const viewController = require("../controller/viewController");

viewRouter
  .route("/home")
  .get(authController.isSign, viewController.getHomePage);
viewRouter
  .route("/shopDetail")
  .get(authController.isSign, viewController.getShopDetailPage);
viewRouter
  .route("/cart")
  .get(authController.isSign, viewController.getCartPage);
viewRouter
  .route("/contact")
  .get(authController.isSign, viewController.getContactPage);
viewRouter
  .route("/checkout")
  .get(authController.isSign, viewController.getCheckoutPage);

viewRouter
  .route("/shop")
  .get(authController.isSign, viewController.getShopPage);

viewRouter.route("/login").get(viewController.getLoginPage);
viewRouter.route("/sign-up").get(viewController.getSignUpPage);

viewRouter.route("/logout").post(viewController.logout);

viewRouter
  .route("/success")
  .get(authController.isSign, viewController.getHomePage);

viewRouter.route("/error").get(authController.isSign, (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "An error accured",
  });
});

module.exports = viewRouter;

// app.use(
//   "/success",
//   authController.isSign,
//   async (req, res, next) => {
//     if (!req.user) {
//       console.log(req.user);
//       const user = User({
//         name: userProfile.given_name,
//         email: userProfile.email,
//       });

//       await user.save({ validateBeforeSave: false });

//       console.log(user);

//       const token = createToken(user._id);

//       saveTokenCookie(res, token, req);

//       console.log(token);

//       res.locals.userData = user;

//       next();
//     } else {
//       next();
//     }
//   },
//   viewController.getHomePage
// );

// app.use("/error", (req, res) => res.render("sign-up"));
