import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Login = () => {
  const { role } = useParams(); // Get role from URL
  const navigate = useNavigate(); // Navigation hook
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${role} with email: ${formData.email}`);
    // Navigate to a dashboard or another page after login
    navigate("/features");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Login as {role}</h1>
      <form className="mt-6 bg-white shadow-lg rounded-lg p-8 w-96" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border-gray-300 p-3 rounded-lg mb-4"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full border-gray-300 p-3 rounded-lg mb-4"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate(`/signup/${role}`)}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
