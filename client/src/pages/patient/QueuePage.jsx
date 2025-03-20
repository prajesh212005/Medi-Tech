import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QueuePage() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_URL
          }/api/appointment/get-appoinement-detail-patient/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAppointment(response.data.appointment);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
    // Auto refresh every minute
    const interval = setInterval(fetchAppointment, 60000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Appointment not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header with back button */}
      <div className="mb-6 flex items-center">
        <button
          onClick={() => window.history.back()}
          className="mr-4 text-blue-500 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Queue Status</h1>
      </div>

      {/* Doctor info card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-blue-600">
              {appointment.doctor.name.split(" ")[1][0]}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {appointment.doctor.name}
            </h2>
            <p className="text-cyan-600 font-medium capitalize">
              {appointment.doctor.specialization}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500">Department</span>
            <p className="font-medium text-gray-800 capitalize">
              {appointment.department}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-500">Appointment Time</span>
            <p className="font-medium text-gray-800">
              {appointment.appointmentTime}
            </p>
          </div>
        </div>
      </div>

      {appointment.queueInfo && (
        <>
          {/* Queue status cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 mb-2">Your Token</h3>
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <svg
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-blue-600">
                  {appointment.queueInfo.tokenNumber}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 mb-2">Current Token</h3>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-green-600">
                  {appointment.queueInfo.currentToken}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-500 mb-2">Estimated Wait</h3>
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-bold text-purple-600">
                  {appointment.queueInfo.waitingTime}
                </span>
              </div>
            </div>
          </div>

          {/* Queue progress */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-gray-700">Queue Progress</h3>
              <span className="text-sm text-gray-500">
                {appointment.queueInfo.patientsAhead} patients ahead
              </span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                <div
                  style={{
                    width: `${
                      (appointment.queueInfo.currentToken /
                        appointment.queueInfo.tokenNumber) *
                      100
                    }%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>

          {/* Queue metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium text-gray-700 mb-4">Queue Statistics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Total Patients</span>
                <p className="font-medium text-gray-800">
                  {appointment.queueInfo.totalPatientsInQueue}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Completed</span>
                <p className="font-medium text-gray-800">
                  {appointment.queueInfo.completedPatients}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Expected Start</span>
                <p className="font-medium text-gray-800">
                  {appointment.queueInfo.estimatedStartTime}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-500">Avg. Consultation</span>
                <p className="font-medium text-gray-800">
                  {appointment.queueInfo.averageConsultationTime} min
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Help text */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>The queue status updates automatically every minute.</p>
        <p>Please be ready 10 minutes before your estimated start time.</p>
      </div>
    </div>
  );
}

export default QueuePage;
