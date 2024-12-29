import React, { useState } from "react";
import './App.css';  

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: "15px" }}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>DELETE</button>
      <button onClick={() => onEdit(todo.id, todo.text)}>EDIT</button>
    </div>
  );
};

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [editingId, setEditingId] = useState(null);  
  const [editedText, setEditedText] = useState("");  

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingId ? { ...todo, text: editedText } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);  
    setEditedText(""); 
  };

  const cancelEdit = () => {
    setEditingId(null);  
    setEditedText("");  
  };

  
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;  
  });

  return (
    <div className="todo-app">
      <h1>TO DO LIST</h1>

      {/* Input   */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo} disabled={!newTodo.trim()}>
        ADD
      </button>

      {/* Filter Options */}
      <div className="filter-options">
        <button onClick={() => setFilter("all")}>ALL</button>
        <button onClick={() => setFilter("completed")}>DONE</button>
        <button onClick={() => setFilter("incomplete")}>NOT DONE</button>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.id}>
            {editingId === todo.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={saveEdit}>SAVE</button>
                <button onClick={cancelEdit}>CANCEL</button>
              </div>
            ) : (
              <TodoItem
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={startEdit}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
