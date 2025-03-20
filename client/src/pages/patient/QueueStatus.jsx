import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function QueueStatus() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'today', 'upcoming'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_URL
          }/api/appointment/get-all-appoinement-patient`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    // Set up auto-refresh every minute for queue updates
    const interval = setInterval(fetchAppointments, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleViewQueue = (appointmentId) => {
    navigate(`/patient/queue-status/${appointmentId}`);
  };

  // Filter appointments based on selected filter
  const filteredAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case "today":
        return aptDate.toDateString() === today.toDateString();
      case "upcoming":
        return aptDate > today;
      default:
        return true;
    }
  });

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce((acc, apt) => {
    const date = new Date(apt.date).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(apt);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-cyan-600">My Appointments</h2>
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {["all", "today", "upcoming"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 rounded-md text-sm transition-all capitalize ${
                  filter === filterType
                    ? "bg-cyan-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments Grid */}
      {Object.entries(groupedAppointments).map(([date, dateAppointments]) => (
        <div key={date} className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3 px-1">
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dateAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
              >
                {/* Compact Card Header */}
                <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 border border-blue-100">
                    <span className="text-blue-600 text-sm font-semibold">
                      {appointment.doctor.name.split(" ")[0][0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">
                      {appointment.doctor.name}
                    </h3>
                    <p className="text-sm text-cyan-600">
                      {appointment.doctor.specialization}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ml-2 ${
                      appointment.status === "scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : appointment.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                {/* Compact Info Section */}
                <div className="p-3 space-y-3">
                  <div className="flex text-sm justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-medium">
                      {appointment.appointmentTime}
                    </span>
                  </div>

                  {appointment?.queueInfo && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex space-x-3">
                          <div>
                            <span className="text-gray-500">Token:</span>
                            <span className="ml-1 font-medium text-blue-600">
                              {appointment.queueInfo.tokenNumber}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Current:</span>
                            <span className="ml-1 font-medium text-green-600">
                              {appointment.queueInfo.currentToken}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-gray-500">Wait:</span>
                          <span className="ml-1 font-medium text-cyan-600">
                            {appointment.queueInfo.estimatedWaitTime}
                          </span>
                        </div>
                      </div>

                      {/* Compact Progress Bar */}
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 transition-all duration-500"
                          style={{
                            width: `${
                              (appointment.queueInfo.currentToken /
                                appointment.queueInfo.tokenNumber) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </>
                  )}

                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleViewQueue(appointment._id)}
                      className="ml-auto text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-md hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                    >
                      View Queue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <div className="text-center bg-white rounded-lg shadow-sm p-6 mt-6">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-500">
            No {filter !== "all" ? filter : ""} appointments scheduled
          </p>
        </div>
      )}
    </div>
  );
}
