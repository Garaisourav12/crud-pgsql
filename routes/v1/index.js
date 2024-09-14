const express = require("express");
const v1ApiRouter = express.Router();

// Import Routes
const userRoutes = require("./userRouter");
const todoRoutes = require("./todoRouter");

// Middleware
const isAuth = require("../../middlewares/isAuth");

// Use Routes
v1ApiRouter.use("/users", userRoutes);
v1ApiRouter.use("/todos", isAuth, todoRoutes);

module.exports = v1ApiRouter;
