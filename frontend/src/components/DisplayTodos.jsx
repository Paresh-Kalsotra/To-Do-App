import React, { useState } from "react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdEdit,
} from "react-icons/md";

function DisplayTodos({ todos, setTodos, serverUrl, setMessage }) {
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editId, setEditId] = useState(null);

  //edit handler to update states
  function editHandler(todo) {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditDesc(todo.desc);
  }

  //func to update todo status
  const statusUpdate = async (id, status) => {
    try {
      await fetch(serverUrl + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completeStatus: status }),
      });

      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completeStatus: status } : todo
      ); //updating todo list

      setTodos(updatedTodos); //setting todolist and message
      setMessage(`Task status updated `);
    } catch (error) {
      setMessage("Unable to update task");
      console.error("Error updating todo:", error);
    }
  };

  //func to delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(serverUrl + id, {
        method: "DELETE",
      });
      const updatedTodos = todos.filter((todo) => todo._id !== id); //filtering data
      setTodos(updatedTodos);
      setEditId(null);
      setMessage("Task Deleted");
    } catch (error) {
      setMessage("Unable to delete Task");
      console.error("Error deleting todo:", error);
    }
  };

  //func to update todo
  async function updateTodo(e) {
    e.preventDefault();
    const id = editId;
    const data = { title: editTitle, desc: editDesc };
    try {
      await fetch(serverUrl + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, title: editTitle, desc: editDesc } : todo
      );

      setTodos(updatedTodos);
      setMessage(`Task status updated `);
      setEditId(null);
    } catch (error) {
      setMessage("Unable to update task");
      console.error("Error updating todo:", error);
    }
  }

  return (
    <div className="todo-container">
      <h4
        style={{
          color: "#eeeeee",
          background: "#00adb5",
          padding: "20px 0 10px 20px",
        }}
      >
        To-Do List
      </h4>

      {todos.map((todo) => (
        <div
          key={todo._id}
          className={
            todo.completeStatus ? "card completedTodo" : "card pendingTodo"
          }
        >
          {/* checking for editId state */}

          {editId === todo._id ? (
            <div className="edit-box">
              {/* div for edit form */}
              <form onSubmit={updateTodo}>
                <div>
                  <label>Task:</label>
                  <input
                    value={editTitle}
                    maxlength="50"
                    onChange={(e) => setEditTitle(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Desc:</label>
                  <input
                    value={editDesc}
                    maxlength="100"
                    onChange={(e) => setEditDesc(e.target.value)}
                  ></input>
                </div>

                <button>Update</button>
              </form>
            </div>
          ) : (
            <div className="todo-box">
              {/* div for todo item */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    className="icon"
                    onClick={() => statusUpdate(todo._id, !todo.completeStatus)}
                  >
                    {todo.completeStatus ? (
                      <MdCheckBox />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </span>
                  <p style={{ fontSize: "larger" }}>{todo.title}</p>
                </div>

                <div>
                  <span className="icon" onClick={() => editHandler(todo)}>
                    <MdEdit />
                    <span className="icon" onClick={() => deleteTodo(todo._id)}>
                      <MdDelete />
                    </span>
                  </span>
                </div>
              </div>

              <p style={{ margin: "5px 0 5px 0" }}>{todo.desc}</p>
              <p>Last Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayTodos;
