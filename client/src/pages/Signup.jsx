import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Signup = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signing up as ${role} with email: ${formData.email}`);
    navigate(`/login/${role}`);  // ✅ Redirect to login after signup
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Sign Up as {role}</h1>
      <form className="mt-6 bg-white shadow-lg rounded-lg p-8 w-96" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full border-gray-300 p-3 rounded-lg mb-4"
          onChange={handleChange}
        />
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
        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg w-full">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate(`/login/${role}`)}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
