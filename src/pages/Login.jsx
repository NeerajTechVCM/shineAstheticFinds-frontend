import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token (optional)
     
        // Redirect to dashboard
        navigate("/admin-dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  setFormData({ email: "", password: "" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-rose-50 to-amber-100 px-4 py-12">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6 border border-rose-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <FaUserShield className="text-4xl mx-auto text-rose-500" />
          <h2 className="text-2xl font-bold text-rose-600">Admin Login</h2>
          <p className="text-sm text-gray-500">
            Enter your credentials to access the admin panel.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email
  </label>
  <input
    type="email"
    id="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Email address"
    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
    required
  />
</div>


          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg font-medium shadow-md transition"
          >
            Login
          </button>
        </form>

        {/* <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-rose-500 hover:underline">
            SignUp here
          </a>
        </div> */}
      </div>
    </section>
  );
}
