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
  LogOut,
} from "lucide-react";
import Logo from "../components/Logo";
import WithAuthRedirect from "../components/withAuthRedirect ";

// SidebarItem Component
function SidebarItem({ icon, text, to, collapsed }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li>
      <NavLink
        to={to}
        className={`flex items-center p-3 rounded-lg transition-all duration-200
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md"
              : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
          }
          ${collapsed ? "justify-center" : "justify-start"}
        `}
      >
        <span className="flex items-center justify-center">{icon}</span>
        {!collapsed && <span className="ml-3 text-sm font-medium">{text}</span>}
        {isActive && !collapsed && (
          <ChevronRight size={16} className="ml-auto text-white" />
        )}
      </NavLink>
    </li>
  );
}

// Sidebar Component
function Sidebar({ navItems, sidebarOpen, toggleSidebar, isMobile }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 shadow-sm transition-all duration-300
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
      <div className="flex items-center justify-between p-4 py-4 border-b border-gray-200">
        {sidebarOpen && (
          <Logo className="text-2xl sm:text-3xl" font="text-xl sm:text-2xl" />
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 cursor-pointer hover:bg-gray-100"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-3 overflow-y-auto h-[calc(100vh-70px)]">
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

        {/* Bottom Navigation Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
          <ul className="space-y-2">
            <SidebarItem
              icon={<LogOut size={20} />}
              text="Log Out"
              to="/logout"
              collapsed={!sidebarOpen}
            />
          </ul>
        </div>
      </nav>
    </div>
  );
}

// Stats Card Component
const StatsCard = ({ icon, title, value, trend, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 flex items-start justify-between border border-gray-100 hover:shadow-md transition-all">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
      <p
        className={`text-xs font-medium mt-2 ${
          trend > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% since last week
      </p>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
  </div>
);

// Dashboard Component
function Dashboard({ navItems }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showDemoContent, setShowDemoContent] = useState(true);

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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 overflow-y-auto ${
          sidebarOpen && !isMobile ? "md:ml-64" : "md:ml-16"
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              {/* Sidebar Toggle (Mobile) */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-blue-600 md:hidden focus:outline-none"
              >
                <Menu size={20} />
              </button>

              <div className="sm:hidden">
                <Logo className="text-2xl" font="text-xl" />
              </div>

              {/* Search Bar */}
              <div className="relative max-sm:hidden w-auto">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search patients, appointments..."
                  className="pl-10 px-4 py-2 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none rounded-lg placeholder:text-sm text-gray-700 w-full sm:w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications Bell */}
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Section */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-medium">
                  MD
                </div>
                <div className="hidden md:block">
                  <h4 className="text-sm font-medium text-gray-800">
                    Dr. Morgan Davis
                  </h4>
                  <p className="text-xs text-gray-500">Cardiologist</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="md:p-6 p-2">
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

    { icon: <Clock size={20} />, text: "Wait Times", to: "/doctor/wait-times" },
    { icon: <Clipboard size={20} />, text: "Records", to: "/doctor/records" },
    { icon: <FileText size={20} />, text: "Reports", to: "/doctor/reports" },
    { icon: <UserPen size={20} />, text: "Profile", to: "/doctor/profile" },
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
    {
      icon: <Calendar size={20} />,
      text: "Appointments",
      to: "/reception/appointments",
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
      text: "Queue Status",
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

const AppDashboardWithAuth = WithAuthRedirect(AppDashboard);
const ReceptionDashboardWithAuth = WithAuthRedirect(ReceptionDashboard);
const PatientDashboardWithAuth = WithAuthRedirect(PatientDashboard);

export {
  AppDashboardWithAuth,
  ReceptionDashboardWithAuth,
  PatientDashboardWithAuth,
};
