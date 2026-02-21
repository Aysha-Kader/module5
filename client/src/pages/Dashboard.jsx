import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import axios from "axios";
import {useNavigate} from "react-router-dom"


const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const navigate=useNavigate("");
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    if (!token) return navigate( "/login");
    try {
      const res = await axios.get(`${API_URL}/api/tasks`, {
        headers: { Authorization:`Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
   navigate ("/login")
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4 md:mb-0">
            Welcome, {localStorage.getItem("username")}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-lg transition duration-300"
          >
            Logout
          </button>
        </div>

       
        <TaskForm fetchTasks={fetchTasks} />

        
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
}