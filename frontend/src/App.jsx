import React, { useState, useEffect } from "react";
import CreateTodo from "./components/CreateTodo";
import DisplayTodos from "./components/DisplayTodos";

function App() {
  const [todos, setTodos] = useState([]); // todolist
  const [message, setMessage] = useState(""); //meaasges from api requests

<<<<<<< HEAD
  const serverUrl = "https://to-do-app-vatv.onrender.com/api/todos/";
=======
  const serverUrl =
    "https://to-do-app-vatv.onrender.com/api/todos/";
>>>>>>> 7d4f77f5bb138cbbff8ec464b05bed03787f0a32

  //fetching updated todos from Db
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(serverUrl);
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.log("Error fetching todos:", err);
    }
  };

  return (
    <div>
      <CreateTodo
        serverUrl={serverUrl}
        setTodos={setTodos}
        setMessage={setMessage}
      />
      <p
        style={{
          fontWeight: "bolder",
          margin: "10px",
          marginInline: "30px",
          color: "#00adb5",
        }}
      >
        {message}
      </p>
      <DisplayTodos
        todos={todos}
        setTodos={setTodos}
        serverUrl={serverUrl}
        setMessage={setMessage}
      />
    </div>
  );
}

export default App;
