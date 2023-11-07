const express = require("express");
const router = express.Router();

const handleAddRequests = require("../middlewares/todoMiddleware");
const checkToken = require("../middlewares/checkToken");
const todoControllers = require("../controllers/controllers");

// add todo endpoint
router.post(
  "/",
  checkToken.CheckJWTToken,
  handleAddRequests.checkAddRequests,
  todoControllers.addTodo
);

// get all todos endpoint
router.get("/", checkToken.CheckJWTToken, todoControllers.fetchTodos);

// Update todo item route
router.put(
  "/:id",
  checkToken.CheckJWTToken,
  handleAddRequests.checkAddRequests,
  todoControllers.editTodo
);

// delete todo item route
router.delete("/:id", checkToken.CheckJWTToken, todoControllers.deleteTodo);

module.exports = router;
