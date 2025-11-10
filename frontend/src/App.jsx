import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Feed from "./pages/Feed.jsx";
import { useState, useEffect } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Watch for token changes
  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/feed" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/feed" element={token ? <Feed /> : <Navigate to="/login" />} />
    </Routes>
  );
}




