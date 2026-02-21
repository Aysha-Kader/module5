import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const isLoggedIn = !!localStorage.getItem("token"); 

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;