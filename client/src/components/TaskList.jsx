import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function TaskList({ tasks, fetchTasks }) {
  const token = localStorage.getItem("token");

  const toggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${task._id}`, { completed: !task.completed }, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error updating task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {tasks.length === 0 && (
        <p className="text-gray-500 text-center col-span-2">No tasks yet. Add a task above!</p>
      )}
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className={`text-xl font-semibold mb-2 ${task.completed ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </h3>
            <p className={task.completed ? "text-gray-400" : "text-gray-700"}>{task.description}</p>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={() => toggleComplete(task)}
              className={`px-4 py-2 rounded-lg text-white font-medium transition duration-300 ${
                task.completed ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}