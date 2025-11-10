import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      setToken(res.data.token); // update token state
      nav("/feed"); // redirect to feed
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 backdrop-blur-2xl"></div>

      <div className="relative z-10 w-96 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="text-sm block mb-1">Email ID</label>
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 border border-white/20">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent w-full outline-none placeholder-white/70 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="material-icons text-white/70 text-lg">mail</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm block mb-1">Password</label>
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 border border-white/20">
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-transparent w-full outline-none placeholder-white/70 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="material-icons text-white/70 text-lg">lock</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5 text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="accent-purple-400" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-purple-200 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-white text-purple-700 font-semibold py-2 rounded-full shadow-md hover:bg-purple-100 transition-all duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4 text-white/80">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}


