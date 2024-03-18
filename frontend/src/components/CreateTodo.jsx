// CreateTodo.js
import React, { useEffect, useState } from "react";

function CreateTodo({ serverUrl, setTodos, setMessage }) {
  const [newTodo, setNewTodo] = useState({ title: "", desc: "" }); //state for new todo

  //checking newTodo.title and calling addTodo
  useEffect(() => {
    if (!newTodo.title) return;

    addTodo(newTodo);
    setNewTodo({ title: "", desc: "" });
  }, [newTodo]);

  //func to post new todo to db
  const addTodo = async (newTodo) => {
    try {
      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const resMessage = await response.json();
      setMessage(resMessage);

      //fetching todos
      const res = await fetch(serverUrl);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  //submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.elements.todoTitle.value;
    const desc = e.target.elements.todoDesc.value;
    setNewTodo({ title, desc });

    e.target.elements.todoTitle.value = ""; //emptying the input fields
    e.target.elements.todoDesc.value = "";
  };

  return (
    <div className="add-container">
      <form onSubmit={handleSubmit}>
        <h4>Create a New Task</h4>
        <input type="text" name="todoTitle" placeholder="Enter Task" required />
        <input type="text" name="todoDesc" placeholder="Description" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateTodo;
