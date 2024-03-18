const { Router } = require("express");
const todoController = require("../controller/todoController.js");

const router = Router();

//route to create new todo
router.post("/", todoController.createTodo);

//route to get all todos from mongodb
router.get("/", todoController.getTodos);

//route to update todo
router.patch("/:id", todoController.updateTodo);

//route to delete todo
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
