const express = require("express");
const todoController = require("../../controllers/todoController");

const todoRouter = express.Router();

todoRouter.get("/", todoController.getAllTodos);
todoRouter.get("/:id", todoController.getTodoById);
todoRouter.post("/create", todoController.createTodo);
todoRouter.put("/update/:id", todoController.updateTodo);
todoRouter.put("/complete/:id", todoController.completeTodo);
todoRouter.delete("/delete/:id", todoController.deleteTodo);
todoRouter.delete("/delete-my-todos", todoController.deleteMyTodos);

module.exports = todoRouter;
