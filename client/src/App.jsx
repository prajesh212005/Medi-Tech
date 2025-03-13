import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MediQueueLanding from "./pages/MediQueueLanding";
import AboutUs from "./pages/AboutUs";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Protect from "./components/Protect";
import { useUser } from "./context/userContext";
import axios from "axios";
import RedirectIfLoggedIn from "./components/RedirectLogin";
import DashboardLog from "./layouts/Dashboard";

const App = () => {
  const { loginUser, logoutUser } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/user/me", {
          withCredentials: true,
        });
        loginUser(response.data.user);
      } catch (error) {
        setLoading(false);

        if (error.response?.status === 403) {
          logoutUser();
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-solid border-t-transparent border-blue-600" />
      </div>
    );
  }
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <MediQueueLanding />
            </>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/dashboard"
          element={
            <Protect>
              <DashboardLog />
            </Protect>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="main" element={<Dashboard />} />
          {/* Uncomment and update the settings route if needed */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfLoggedIn>
              <Signup />
            </RedirectIfLoggedIn>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
