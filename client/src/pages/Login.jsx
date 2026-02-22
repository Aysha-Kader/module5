import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full mb-4 p-3 border rounded"/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full mb-4 p-3 border rounded"/>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded font-semibold">Login</button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}