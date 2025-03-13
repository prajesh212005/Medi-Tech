import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen size is mobile on initial render and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile); // Open by default on desktop, closed on mobile
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      {isMobile && sidebarOpen && (
        <div
          className="fixed bg-white bg-opacity-30 z-20 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-30 bg-blue-50  border-r border-blue-700/20 shadow-sm
          transition-all duration-300 ease-in-out
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
        <div className="flex items-center justify-between p-4 pb-3 gap-2 border-b text-white border-blue-700/10 bg-transparent">
          {sidebarOpen && (
            <div className="flex items-center">
              <Logo
                className="text-2xl sm:text-3xl"
                font="text-xl sm:text-2xl"
              />
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-md cursor-pointer transition-all duration-200 ${
              isMobile
                ? "text-gray-600 hover:bg-gray-200"
                : sidebarOpen
                ? "text-gray-700 hover:bg-gray-700/10"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {sidebarOpen ? (
              <ChevronLeft
                size={20}
                className={isMobile ? "text-blue-700" : "text-blue-700"}
              />
            ) : (
              <Menu
                size={20}
                className={isMobile ? "text-blue-500" : "text-blue-500"}
              />
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-2 overflow-y-auto max-h-[calc(100vh-64px)]">
          <ul className="space-y-2">
            <SidebarItem
              icon={<Home size={20} />}
              text="Dashboard"
              active={true}
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Calendar size={20} />}
              text="Appointments"
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Users size={20} />}
              text="Patients"
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Activity size={20} />}
              text="Vital Signs"
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Clock size={20} />}
              text="Wait Times"
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Clipboard size={20} />}
              text="Records"
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<FileText size={20} />}
              text="Reports"
              collapsed={!sidebarOpen}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              text="Settings"
              collapsed={!sidebarOpen}
            />
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen && !isMobile ? "md:ml-64" : "md:ml-16"
        }`}
      >
        {/* Header */}
        <header className="bg-transparent border-b border-blue-700/20 shadow-sm">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
              {/* Sidebar Toggle (Visible on Mobile) */}
              <button
                onClick={toggleSidebar}
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-2 sm:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, active = false, collapsed, onClick }) {
  return (
    <li>
      <Link
        onClick={onClick}
        className={`flex items-center p-3 text-blue-600 rounded-md transition-all duration-200
          ${active ? "bg-blue-100 " : " hover:bg-blue-400/10"}
          ${collapsed ? "justify-center" : "justify-start"}
        `}
      >
        {/* Icon */}
        <span
          className={`flex items-center justify-center ${
            active ? "text-blue-500" : "text-blue-500"
          }`}
        >
          {icon}
        </span>

        {!collapsed && (
          <span className="ml-3 text-sm font-medium truncate">{text}</span>
        )}

        {active && !collapsed && (
          <ChevronRight size={16} className="ml-auto text-blue-500" />
        )}
      </Link>
    </li>
  );
}

export default Dashboard;
