import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MediQueueLanding from "./pages/MediQueueLanding";
import AboutUs from "./pages/AboutUs";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/patient/Dashboard";
import Protect from "./components/Protect";
import { useUser } from "./context/userContext";
import axios from "axios";

import {
  AppDashboardWithAuth,
  PatientDashboardWithAuth,
  ReceptionDashboardWithAuth,
} from "./layouts/Dashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import Profile from "./pages/patient/Profile";
import DProfile from "./pages/doctor/Profile";

const App = () => {
  const { loginUser, logoutUser } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
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
          path="/patient"
          element={
            <Protect>
              <PatientDashboardWithAuth />
            </Protect>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route
          path="/doctor"
          element={
            <Protect>
              <AppDashboardWithAuth />
            </Protect>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<DProfile />} />
        </Route>
        <Route
          path="/receptionist"
          element={
            <Protect>
              <ReceptionDashboardWithAuth />
            </Protect>
          }
        >
          <Route index element={<Dashboard />} />
          {/* Uncomment and update the settings route if needed */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
