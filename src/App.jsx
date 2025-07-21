import React, { useState } from "react";
import "./App.css";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <span className={todo.completed ? "completed" : ""}>
        {todo.text}
      </span>
      <div>
        <button onClick={onEdit} className="edit-btn">Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input.trim(), completed: false }]);
      setInput("");
    }
  };

  const updateTodo = () => {
    const updated = [...todos];
    updated[editIndex].text = editInput.trim();
    setTodos(updated);
    setEditIndex(null);
    setEditInput("");
  };

  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditInput(todos[index].text);
  };

  return (
    <div className="todo-app">
      <h1>TODO LIST</h1>
      <div>
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo} disabled={!input.trim()}>
          ADD
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) =>
          editIndex === index ? (
            <li className="todo-item edit" key={index}>
              <input
                type="text"
                className="edit-input"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
              <button className="save" onClick={updateTodo}>
                Save
              </button>
              <button className="cancel" onClick={() => setEditIndex(null)}>
                Cancel
              </button>
            </li>
          ) : (
            <TodoItem
              key={index}
              todo={todo}
              onToggle={() => toggleTodo(index)}
              onDelete={() => deleteTodo(index)}
              onEdit={() => startEdit(index)}
            />
          )
        )}
      </ul>
    </div>
  );
}

