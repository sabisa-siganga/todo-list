import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./todoItem.scss";
import { Todo } from "../../interfaces/interfaces";
import { returnBearer } from "../../utils/utils";

// props interface
interface Props {
  todo: Todo;
  onResults: (data: Todo[]) => void;
}

const TodoItem = (props: Props) => {
  // props destrcturing
  const { todo, onResults } = props;

  // states
  const [edits, setEdits] = useState(false);
  const [titleValue, setTitleValue] = useState(todo.title);
  const [descriptionValue, setDescriptionValue] = useState(todo.description);

  // triggering onEdit function
  const onEdit = async () => {
    // updating the state
    setEdits(true);
  };

  // Deleting the todo item using its id
  const onDelete = async () => {
    // delete endpoint
    const deleteUrl = `/todos/${todo.id}`;
    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(),
        },
      });
      const results = await response.json();

      // checking if there's an error, thus displaying an alert
      if (results.error) {
        return alert(results.error);
      }

      // Passing the todos array to the onResults callback function
      onResults(results.todos);
    } catch (error) {
      console.log(error);
    }
  };

  // Marking the todo item as complete
  const onComplete = async () => {
    // creating the url to update a todo
    const editUrl = `/todos/${todo.id}`;
    try {
      // Send a PUT request to update the todo's properties, including setting 'isCompleted' to true
      const response = await fetch(editUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(),
        },
        body: JSON.stringify({
          title: titleValue,
          description: descriptionValue,
          isCompleted: true,
        }),
      });

      // Parse the response as JSON
      const results = await response.json();

      // Check for errors in the response
      if (results.error) {
        return alert(results.error);
      }

      // Updating the results and trigger the 'onResults' callback to display the changes
      onResults(results.todos);
    } catch (error) {
      // error handling
      console.log(error);
    }
  };

  const onSave = async (event: React.FormEvent) => {
    event.preventDefault();

    // creating the url to update a todo
    const editUrl = `/todos/${todo.id}`;
    try {
      const response = await fetch(editUrl, {
        // Send a PUT request to update the todo's properties
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: returnBearer(),
        },
        body: JSON.stringify({
          title: titleValue,
          description: descriptionValue,
          isCompleted: todo.isCompleted,
        }),
      });

      // Parse the response as JSON
      const results = await response.json();
      if (results.error) {
        return alert(results.error);
      }

      // Updating the results and trigger the 'onResults' callback to display the changes
      onResults(results.todos);

      // updating the state
      setEdits(false);
    } catch (error) {
      // error handling
      console.log(error);
    }
  };
  return (
    <div className="list-btns-cont px-5">
      {edits ? (
        <div className="input-edit px-4">
          {/* form containing the input field, save, edit, delete and done buttons */}
          <form onSubmit={onSave}>
            <div className="editing">
              {/* input field for todo title */}
              <div className="input-fields mb-4">
                <label>Title:</label>
                <input
                  value={titleValue}
                  onChange={(e) => {
                    setTitleValue(e.target.value);
                  }}
                />
              </div>
              {/* input field for todo description */}
              <div className="input-fields mb-4">
                <label>Description:</label>
                <input
                  value={descriptionValue}
                  onChange={(e) => {
                    setDescriptionValue(e.target.value);
                  }}
                />
              </div>

              <div className="save mb-5">
                {/* save changes button*/}
                <button className="save-btn" type="submit">
                  Save changes
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div
            className={`displayTodo mb-4 ${todo.isCompleted && "linestroke"}`}
          >
            <div>
              <div>{todo.title}</div>
              <div>{todo.description}</div>
            </div>

            {/* edit, delete and done buttons below */}
            <div className="buttons">
              <Button
                className="btns px-0 py-0"
                onClick={onEdit}
                disabled={todo.isCompleted}
              >
                <span className="material-symbols-outlined py-1">edit</span>
              </Button>
              <Button className="btns px-0 py-0" onClick={onDelete}>
                <span className="material-symbols-outlined py-1">delete</span>
              </Button>

              <Button
                className="btns px-0 py-0"
                onClick={onComplete}
                disabled={todo.isCompleted}
              >
                <span className="material-symbols-outlined py-1">done</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
