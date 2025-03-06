// src/pages/Login.js
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { Toaster, toast } from "react-hot-toast";
import Logo from "../components/Logo";
import axios from "axios";
import { useUser } from "../context/userContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginUser } = useUser();
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInput = () => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter your password");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSignin = async () => {
    if (!validateInput()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );
      loginUser(response.data.user);
      toast.success("User logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-screen max-md:p-4 relative bg-gradient-to-br from-blue-100 via-white to-blue-100 flex justify-center items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[410px] z-10 p-6 rounded-md bg-blue-100/50 border border-blue-600/20">
          <div className="flex flex-col justify-center text-center gap-6">
            <div className="flex flex-col gap-1 items-center">
              <Logo className="text-2xl sm:text-3xl" />
              <span className="text-blue-700 font-semibold text-sm">
                Sign in to your Meditech Account
              </span>
            </div>
            <div className="mt-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-blue-800 text-start font-semibold text-sm">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    name="email"
                    onChange={handleInputChange}
                    className="px-3 py-2 bg-blue-50 border border-blue-600/20 focus:ring-1 focus:ring-blue-600 outline-none rounded-md placeholder:text-sm text-blue-600"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-blue-800 text-start font-semibold text-sm">
                      Password
                    </span>
                    <Link className="text-blue-800 text-start hover:underline text-sm">
                      Forgot password
                    </Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="px-3 py-2 bg-blue-50 focus:ring-1  border border-blue-600/20 focus:ring-blue-600 outline-none rounded-md placeholder:text-sm text-blue-600"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-3">
              {!loading ? (
                <button
                  onClick={handleSignin}
                  className="bg-blue-600 py-1 gap-2 rounded-md flex items-center text-white justify-center w-full text-center"
                >
                  <span>
                    <CiMail size={25} color="white" />
                  </span>
                  <span className="text-sm">Login with Mail</span>
                </button>
              ) : (
                <button
                  disabled={!loading}
                  className="bg-blue-600 py-2 gap-2 rounded-md flex items-center text-white justify-center w-full text-center"
                >
                  <div className="w-4 h-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin" />
                  <span className="text-sm font-[500]">Signing in...</span>
                </button>
              )}
              <Link
                to="/signup"
                className="text-blue-700 hover:underline text-[14px] font-[400] cursor-pointer"
              >
                Don't have an Account?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
