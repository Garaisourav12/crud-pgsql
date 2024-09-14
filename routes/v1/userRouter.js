const userController = require("../../controllers/userController");
const isAuth = require("../../middlewares/isAuth");
const userRouter = require("express").Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/me", isAuth, userController.getMe);
userRouter.get("/logout", userController.logout);

module.exports = userRouter;
