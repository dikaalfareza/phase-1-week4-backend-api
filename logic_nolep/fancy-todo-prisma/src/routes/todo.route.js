const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.route("/todos")
    .get(todoController.getTodos)
    .post(todoController.createTodo);

router.route("/todos/user/:userId")
    .get(todoController.getTodosByUserId);

router.route("/todos/:id")
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo);

module.exports = router;