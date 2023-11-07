// Importing jsonwebtoken
const jwt = require("jsonwebtoken");

// Importing  generateToken from middlewarea
const { generateToken } = require("../middlewares/checkToken");

// initializing todos variable to store todos
const todos = {};

// user information
const userDetails = {
  username: "sabisa@gmail.com",
  password: "sabisa@gmail.com",
};

// creating id
let nextId = Object.keys(todos).length;

// Logging in
async function login(req, res) {
  try {
    if (
      req.body.username == userDetails.username &&
      req.body.password == userDetails.password
    ) {
      let jwtToken = generateToken({
        username: userDetails.username,
      });
      res.status(200).json({ token: jwtToken });
    } else {
      res.status(401).json({ message: "User is not authenticated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Adding a todo item
async function addTodo(req, res) {
  try {
    // getting username from the req
    const { username } = req.user;

    // destructuring the title and description
    const { title, description } = req.body;

    // checking if title and description exists, if not, response with an error
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    nextId += 1;

    // Creating a new todo object
    const newTodoItem = {
      id: nextId,
      title,
      description,
      isCompleted: false,
    };

    // If the todo exists, push it to todos list otherwise create a new record initializing with array of a todo
    if (todos[username]) {
      todos[username].push(newTodoItem);
    } else {
      todos[username] = [newTodoItem];
    }

    console.log(todos);
    // Responding with a 200 status and return the added item
    res
      .status(200)
      .json({ message: "Todo item added successfully", todo: newTodoItem });
  } catch (error) {
    console.error(error);
    // error handling
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// getting all todo items
async function fetchTodos(req, res) {
  try {
    const { username } = req.user;

    // Responding with a 200 status and return the list of todos
    res.status(200).json({ todos: todos[username] || [] });
  } catch (error) {
    console.log(error);

    // error handling
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// updating the todo item
async function editTodo(req, res) {
  try {
    const { username } = req.user;

    // getting the id from the request params
    const id = req.params.id;

    // getting the updated title and description from the request body
    const { title, description, isCompleted } = req.body;

    if (!todos[username]) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    // Getting the index of a todo
    const todoIndex = todos[username].findIndex(
      (todo) => todo.id === parseInt(id)
    );

    // Checking if there is a todo item to update
    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    const todoToUpdate = todos[username][todoIndex];

    // Updating the todo properties
    todoToUpdate.title = title || todoToUpdate.title;
    todoToUpdate.description = description || todoToUpdate.description;
    todoToUpdate.isCompleted = isCompleted;

    todos[username][todoIndex] = todoToUpdate;
    console.log(todos[username]);

    // Responding with a 200 status and return the list of todos
    res.status(200).json({
      message: "Successfully updated the todo item",
      todos: todos[username],
    });

    res.status(200).json();
  } catch (error) {
    console.log(error);
    // error handling
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete a todo id using its id
async function deleteTodo(req, res) {
  try {
    const { username } = req.user;

    // get the 'id' from the route parameters
    const todoId = req.params.id;

    if (!todos[username]) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    // Find the index of the todo with the specified ID in the 'todos' array
    const todoIndex = todos[username].findIndex(
      (todo) => todo.id === parseInt(todoId)
    );

    // checking if todo exists, if not respond with an error
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Remove the todo from the 'todos' array using the found 'todoIndex'
    todos[username].splice(todoIndex, 1);

    // Responding with a 201 status and return the list of todos
    res.status(201).json({
      message: "Item has been successfully deleted",
      todos: todos[username],
    });
  } catch (error) {
    console.error(error);
    // handling error
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  login,
  addTodo,
  fetchTodos,
  editTodo,
  deleteTodo,
};
