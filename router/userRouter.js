const userRouter = require("express").Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");

userRouter.route("/signUp").post(authController.signUp);
userRouter.route("/login").post(authController.login);

userRouter.route("/forgotPassword").post(authController.forgotPassword);
userRouter.route("/resetPassword/:token").post(authController.resetPassword);

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.addUser);

userRouter
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
