import { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Signup successful! Please log in.");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 backdrop-blur-2xl"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-96 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <label className="text-sm block mb-1">Full Name</label>
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 border border-white/20">
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-transparent w-full outline-none placeholder-white/70 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="material-icons text-white/70 text-lg">person</span>
          </div>
        </div>

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

        <div className="mb-5">
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

        <button
          onClick={handleSignup}
          className="w-full bg-white text-purple-700 font-semibold py-2 rounded-full shadow-md hover:bg-purple-100 transition-all duration-200"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4 text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

