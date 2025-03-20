import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/userContext";
import {
  Clock,
  User,
  Calendar,
  PlayCircle,
  StopCircle,
  Timer,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

function Dashboard() {
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/api/appointment/get-all-appoinment-doctor/${user.doctor}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAppointmentData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStartConsultation = async (appointmentId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_URL}/api/appointment/start/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchAppointments();
    } catch (err) {
      console.error("Error starting consultation:", err);
    }
  };

  const handleEndConsultation = async (appointmentId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_URL}/api/appointment/complete/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchAppointments();
    } catch (err) {
      console.error("Error ending consultation:", err);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchAppointments} />;

  const currentPatient =
    appointmentData?.appointments?.inProgress?.[0] ||
    appointmentData?.appointments?.scheduled?.find(
      (apt) =>
        apt.queueInfo?.isCurrentPatient && apt.queueInfo?.status === "waiting"
    );

  // Update waiting patients filter
  const waitingPatients =
    appointmentData?.appointments?.scheduled?.filter(
      (apt) => !apt.queueInfo?.isCurrentPatient && apt.status === "scheduled"
    ) || [];

  // Update the status badge styles
  const getStatusBadge = (status) => {
    const styles = {
      scheduled: "bg-yellow-100 text-yellow-800",
      waiting: "bg-blue-100 text-blue-800",
      "in-progress": "bg-green-100 text-green-800",
      completed: "bg-purple-100 text-purple-800",
    };
    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Token"
          value={appointmentData?.queueStats?.currentToken || "-"}
          icon={<Clock className="text-blue-500" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Waiting"
          value={appointmentData?.queueStats?.waitingCount || 0}
          icon={<User className="text-yellow-500" />}
          color="bg-yellow-50"
        />
        <StatCard
          title="Completed"
          value={appointmentData?.queueStats?.completedCount || 0}
          icon={<Calendar className="text-green-500" />}
          color="bg-green-50"
        />
        <StatCard
          title="Average Time"
          value={`${
            appointmentData?.queueStats?.averageConsultationTime || 0
          } min`}
          icon={<Timer className="text-purple-500" />}
          color="bg-purple-50"
        />
      </div>

      {/* Current Patient Card */}
      {currentPatient && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Current Patient</h2>
            <div className="flex items-center gap-3">
              {currentPatient.queueInfo?.actualStartTime && (
                <span className="text-sm text-gray-500">
                  Started at: {currentPatient.queueInfo.actualStartTime}
                </span>
              )}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentPatient.status === "in-progress"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {currentPatient.status === "in-progress"
                  ? "In Consultation"
                  : "Waiting"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Patient Name</p>
                <p className="text-lg font-medium">
                  {currentPatient.patient.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Token Number</p>
                <p className="text-lg font-medium">
                  {currentPatient.queueInfo.tokenNumber}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Scheduled Time</p>
                <p className="text-lg font-medium">
                  {currentPatient.scheduledTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="text-lg font-medium capitalize">
                  {currentPatient.department}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
              {currentPatient.status === "scheduled" ||
              currentPatient.status === "waiting" ? (
                <button
                  onClick={() => handleStartConsultation(currentPatient._id)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                >
                  <PlayCircle className="w-5 h-5" />
                  Start Consultation
                </button>
              ) : (
                <button
                  onClick={() => handleEndConsultation(currentPatient._id)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
                >
                  <StopCircle className="w-5 h-5" />
                  End Consultation
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Waiting List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Waiting List</h2>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            {waitingPatients.length} waiting
          </span>
        </div>
        <div className="divide-y divide-gray-200">
          {waitingPatients.map((appointment) => (
            <div
              key={appointment._id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                    {appointment.queueInfo.tokenNumber}
                  </span>
                  <h3 className="text-lg font-medium">
                    {appointment.patient.name}
                  </h3>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <span className="mr-4">
                    Scheduled: {appointment.scheduledTime}
                  </span>
                  <span>Department: {appointment.department}</span>
                </div>
              </div>
            </div>
          ))}
          {waitingPatients.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No patients in waiting list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const LoadingState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
    <button onClick={onRetry} className="text-blue-600 hover:text-blue-800">
      Try again
    </button>
  </div>
);

const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg p-4 flex items-center justify-between`}>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
    <div className="p-3 rounded-full bg-white">{icon}</div>
  </div>
);

export default Dashboard;
