import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Middle = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [searchText, setSearchText] = useState("");

  // 🔁 Load todos from localStorage once
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  // ✅ Save todos to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd() {
    const newTodo = {
      id: uuidv4(),
      todo: todo.trim(),
      isCompleted: false,
    };
    if (newTodo.todo.length > 0) {
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  }

  function handleChange(e) {
    setTodo(e.target.value);
  }

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  function handleEdit(e, id) {
    const selected = todos.find((t) => t.id === id);
    if (selected) {
      setTodo(selected.todo);
      const remaining = todos.filter((t) => t.id !== id);
      setTodos(remaining);
    }
  }

  function handleDelete(e, id) {
    const remaining = todos.filter((t) => t.id !== id);
    setTodos(remaining);
  }

  function handleCheckbox(e) {
    const id = e.target.name;
    const updated = todos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updated);
  }

  const filteredTodos = todos.filter((item) => {
    const matchesSearch = item.todo.toLowerCase().includes(searchText.toLowerCase());
    const matchesFinished = showFinished || !item.isCompleted;
    return matchesSearch && matchesFinished;
  });

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Your Tasks
        </h2>

        {/* 🔍 Search Input */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search your task..."
            onChange={handleSearchChange}
            value={searchText}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-purple-700 transition">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>

        {/* ➕ Add Task */}
        <div className="flex gap-4 my-6">
          <input
            type="text"
            placeholder="Add your task..."
            onChange={handleChange}
            value={todo}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAdd}
            disabled={todo.trim().length <= 3}
            className="px-6 py-2 disabled:bg-gray-400 bg-black text-white rounded-lg hover:bg-purple-700 transition"
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>

        {/* ✅ Show Finished Toggle */}
        <label className="flex items-center gap-2 my-4">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={() => setShowFinished(!showFinished)}
          />
          <span>Show finished todos</span>
        </label>

        <span className="font-bold text-black font-sans">Your Tasks</span>

        {/* 📋 Todos List */}
        <div className="mytodos mt-10">
          {filteredTodos.length === 0 && (
            <div className="m-5">No matching todos to display</div>
          )}
          {filteredTodos.map((item) => (
            <div
              className="todo flex justify-between items-center my-4"
              key={item.id}
            >
              <input
                type="checkbox"
                name={item.id}
                onChange={handleCheckbox}
                checked={item.isCompleted}
              />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
              <div className="buttons flex gap-2">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-purple-700 transition"
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-purple-700 transition"
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Middle;
