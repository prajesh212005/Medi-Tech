import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronRight,
  Calendar,
  Activity,
  Clock,
  Clipboard,
  ChevronLeft,
  PanelsTopLeft,
  UserPen,
} from "lucide-react";
import Logo from "../components/Logo";

// SidebarItem Component
function SidebarItem({ icon, text, to, collapsed }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li>
      <NavLink
        to={to}
        className={`flex items-center p-3 rounded-md transition-all duration-200
          ${
            isActive
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-blue-400/10 text-blue-600"
          }
          ${collapsed ? "justify-center" : "justify-start"}
        `}
      >
        <span className="flex items-center justify-center">{icon}</span>
        {!collapsed && <span className="ml-3 text-sm font-medium">{text}</span>}
        {isActive && !collapsed && (
          <ChevronRight size={16} className="ml-auto text-blue-500" />
        )}
      </NavLink>
    </li>
  );
}

// Sidebar Component
function Sidebar({ navItems, sidebarOpen, toggleSidebar, isMobile }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-blue-50 border-r border-blue-700/20 shadow-sm transition-all duration-300
        ${sidebarOpen ? "w-64" : "w-16"}
        ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 py-3 ">
        {sidebarOpen && (
          <Logo className="text-2xl sm:text-3xl" font="text-xl sm:text-2xl" />
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-blue-500 cursor-pointer hover:bg-blue-600/10"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-2 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              to={item.to}
              collapsed={!sidebarOpen}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}

// Main Dashboard Component
function Dashboard({ navItems }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent ${
          sidebarOpen && !isMobile ? "md:ml-64" : "md:ml-16"
        }`}
      >
        {/* Header */}
        <header className="bg-transparent border-b border-blue-700/20 shadow-sm">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
              {/* Sidebar Toggle (Visible on Mobile) */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-blue-600 md:hidden focus:outline-none"
              >
                <PanelsTopLeft size={20} className="text-blue-600/40" />
              </button>

              <div className="sm:hidden">
                <Logo className="text-2xl" font="text-xl" />
              </div>

              {/* Search Bar */}
              <div className="relative max-sm:hidden w-auto">
                <Search
                  size={14}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 px-3 py-1.5  border border-blue-600/20 focus:ring-1 focus:ring-blue-600 outline-none rounded-md placeholder:text-sm text-blue-600 w-full sm:w-[250px]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Notifications Bell */}
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Avatar */}
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                MD
              </div>
            </div>
          </div>
        </header>

        <main className="flex ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Role-based Dashboards
function AppDashboard() {
  const doctorNavItems = [
    { icon: <Home size={20} />, text: "Dashboard", to: "/doctor" },
    {
      icon: <Calendar size={20} />,
      text: "Appointments",
      to: "/doctor/appointments",
    },
    { icon: <Users size={20} />, text: "Patients", to: "/doctor/patients" },
    {
      icon: <Activity size={20} />,
      text: "Vital Signs",
      to: "/doctor/vital-signs",
    },
    { icon: <Clock size={20} />, text: "Wait Times", to: "/doctor/wait-times" },
    { icon: <Clipboard size={20} />, text: "Records", to: "/doctor/records" },
    { icon: <FileText size={20} />, text: "Reports", to: "/doctor/reports" },
    { icon: <Settings size={20} />, text: "Settings", to: "/doctor/settings" },
  ];

  return <Dashboard navItems={doctorNavItems} />;
}

function ReceptionDashboard() {
  const receptionNavItems = [
    { icon: <Home size={20} />, text: "Dashboard", to: "/reception" },
    {
      icon: <Users size={20} />,
      text: "Register Patient",
      to: "/reception/register-patient",
    },
    {
      icon: <Clipboard size={20} />,
      text: "Check Beds",
      to: "/reception/check-beds",
    },
    {
      icon: <Clock size={20} />,
      text: "Manage Queue",
      to: "/reception/manage-queue",
    },
    { icon: <FileText size={20} />, text: "Reports", to: "/reception/reports" },
    {
      icon: <Settings size={20} />,
      text: "Settings",
      to: "/reception/settings",
    },
  ];

  return <Dashboard navItems={receptionNavItems} />;
}

function PatientDashboard() {
  const patientNavItems = [
    { icon: <Home size={20} />, text: "Dashboard", to: "/patient" },
    {
      icon: <Calendar size={20} />,
      text: "Book Appointment",
      to: "/patient/book-appointment",
    },
    {
      icon: <Clock size={20} />,
      text: "Check Queue Status",
      to: "/patient/queue-status",
    },
    {
      icon: <FileText size={20} />,
      text: "Medical History",
      to: "/patient/medical-history",
    },
    { icon: <UserPen size={20} />, text: "Profile", to: "/patient/profile" },
  ];

  return <Dashboard navItems={patientNavItems} />;
}

export { AppDashboard, ReceptionDashboard, PatientDashboard };
