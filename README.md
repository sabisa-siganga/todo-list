# Todo App Backend

This is the backend component of a Todo application that provides functionality to add, read, edit, delete, and mark todo items as completed.

## Getting Started

This backend is designed to work in conjunction with the frontend component, which is the web application. Ensure that the corresponding frontend application is set up to connect to this backend API.

## Available Endpoints

The following API endpoints are available for interaction:

- **GET /login**: login in to the app
- **POST /todos/**: Create a new todo.
- **GET /todos/**: Retrieve a list of all todos.
- **PUT /todos/:id**: Update a specific todo.
- **DELETE /todos/:id**: Delete a specific todo.

## Installation and Setup

1. Clone this repository:

git clone <repository_url>

cd middleware-app

2. Install the required dependencies:

npm install

4. Run the application:

npm start

The API should now be running at http://localhost:8080.

## Usage

You can interact with the API by making HTTP requests to the endpoints provided above. You can use tools like Postman or directly integrate it into your frontend application.

## Authentication

This backend require authentication to login, add, read,update and delete todo as well as marking the task as complete.

Feel free to explore and use the backend API for managing your todos!
