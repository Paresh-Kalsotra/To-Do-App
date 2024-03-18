const todoModel = require("../models/todoModel.js");

//creating new todo
async function createTodo(req, res) {
  try {
    const todo = req.body;
    await todoModel.create(todo);

    res.status(201).json("Successfully created new task.");
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to create new task.");
  }
}

//getting all todos from tododb
async function getTodos(req, res) {
  try {
    const tasks = await todoModel.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

//updating task
async function updateTodo(req, res) {
  try {
    const id = req.params.id;
    await todoModel.findOneAndUpdate({ _id: id }, req.body);
    res.status(201).json("Task updated successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to update task.");
  }
}

//deleting task
async function deleteTodo(req, res) {
  try {
    await todoModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json("Task deleted.");
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to delete task.");
  }
}

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
