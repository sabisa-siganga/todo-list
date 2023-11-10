import React, { useEffect } from "react";
import { useState } from "react";
import "./App.scss";
import TodoItem from "./components/to-do/todoItem";
import { checkIsLogin, returnBearer } from "./utils/utils";
import { Todo } from "./interfaces/interfaces";
import AuthPage from "./components/authPage/authPage";

// Creating a todo app that allows the use to add/read,update and delete the todo item(s) and mark it as completed

function App() {
  // states
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLogin, setIsLogin] = useState(false);

  // Handling the addition of a new todo
  const onAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Send a POST request to create a new todo
      const response = await fetch("/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(),
        },
        body: JSON.stringify({
          title: titleValue,
          description: descriptionValue,
        }),
      });

      // Parse the response as JSON
      const results = await response.json();

      // Check for errors in the response
      if (results.error) {
        return alert(results.error);
      }

      // Update the todos state with the new todo item
      setTodos((prev) => {
        return [...prev, results.todo];
      });

      // Clear the input fields
      setTitleValue("");
      setDescriptionValue("");
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      // Send a POST request to create a new todo
      const response = await fetch("/todos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(),
        },
      });

      // Parse the response as JSON
      const results = await response.json();

      // Check for errors in the response
      if (results.error) {
        return alert(results.error);
      }

      // Update the todos state with the new todo item
      setTodos(results.todos);
    } catch (error) {
      console.log(error);
    }
  };

  // Update the 'todos' state with new data
  const getResults = (data: Todo[]) => {
    setTodos(data);
  };

  // Set the user login status to true
  const onUserLogin = () => {
    setIsLogin(true);

    fetchTodos();
  };

  //on component mount fetch todos
  useEffect(() => {
    // Check if the user is already logged in and update the login status
    const storeLoginStatus = checkIsLogin();
    setIsLogin(storeLoginStatus);

    // If the user is logged in, fetch their todos
    if (storeLoginStatus) {
      fetchTodos();
    }
  }, []);

  // on logout clear the token from local storage and setting isLogin to false
  const onLogout = () => {
    localStorage.removeItem("Token");
    setIsLogin(false);
  };

  return (
    <>
      {isLogin ? (
        <div className="todoItem-container pb-5">
          <h2 className="title mb-5 text-center">
            Todo List
            <button className="logout-btn" onClick={onLogout}>
              Log out
            </button>
          </h2>

          <div className="input-add-btn">
            {/* form containing input and add button */}
            <form className="form-info" onSubmit={onAdd}>
              <div className="input-container">
                <div className="input-fields  mb-4">
                  <label>Title</label>
                  <input
                    placeholder="Please enter todo title"
                    value={titleValue}
                    onChange={(e) => {
                      setTitleValue(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-fields mb-4">
                  <label>Description</label>
                  <input
                    placeholder="Please enter todo description"
                    value={descriptionValue}
                    onChange={(e) => {
                      setDescriptionValue(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="add-btn  mb-4">
                  {/* add todo button */}
                  <button className="add-btn" type="submit">
                    Add Todo
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* displaying the todo items */}
          <div className="heading mb-4">Todos:</div>
          <div className="todo-list">
            {todos.map((todo, index) => {
              return (
                <TodoItem todo={todo} key={index} onResults={getResults} />
              );
            })}
          </div>
        </div>
      ) : (
        <AuthPage onLogin={onUserLogin} />
      )}
    </>
  );
}

export default App;
