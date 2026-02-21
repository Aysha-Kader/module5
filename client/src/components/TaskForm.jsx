import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function TaskForm({ fetchTasks }) {
  const [task, setTask] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title || !task.description) return alert("Please fill in all fields");
    try {
      await axios.post(`${API_URL}/api/tasks`, task, { headers: { Authorization:`Bearer ${token}` } });
      setTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition duration-300"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}