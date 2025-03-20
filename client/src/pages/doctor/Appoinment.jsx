import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Clock,
  User,
  Calendar,
  Info,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { useUser } from "../../context/userContext";

function Appointment() {
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useUser();

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate, user]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/api/appointment/get-all-appoinment-doctor/${
          user.doctor
        }?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAppointmentData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch appointments");
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const changeDate = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">{error}</h3>
        <button
          onClick={fetchAppointments}
          className="text-blue-600 hover:text-blue-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Appointments"
          value={appointmentData?.appointmentCounts?.total || 0}
          icon={<Calendar className="text-blue-500" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Scheduled"
          value={appointmentData?.appointmentCounts?.scheduled || 0}
          icon={<Clock className="text-yellow-500" />}
          color="bg-yellow-50"
        />
        <StatCard
          title="In Progress"
          value={appointmentData?.appointmentCounts?.inProgress || 0}
          icon={<User className="text-green-500" />}
          color="bg-green-50"
        />
        <StatCard
          title="Completed"
          value={appointmentData?.appointmentCounts?.completed || 0}
          icon={<Calendar className="text-purple-500" />}
          color="bg-purple-50"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Appointments for {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Today
          </button>
        </div>
      </div>

      {/* Queue Stats */}
      {appointmentData?.queueStats && (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Queue Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <QueueStat
              label="Current Token"
              value={appointmentData.queueStats.currentToken}
            />
            <QueueStat
              label="Waiting"
              value={appointmentData.queueStats.waitingCount}
            />
            <QueueStat
              label="In Progress"
              value={appointmentData.queueStats.inProgressCount}
            />
            <QueueStat
              label="Completed"
              value={appointmentData.queueStats.completedCount}
            />
            <QueueStat
              label="Avg. Time"
              value={`${appointmentData.queueStats.averageConsultationTime} mins`}
            />
          </div>
        </div>
      )}

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {Object.values(appointmentData?.appointments || {}).flat().length >
          0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Token
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(appointmentData.appointments).map(
                  ([status, appointments]) =>
                    appointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {appointment.queueInfo?.tokenNumber || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patient.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {appointment.patient.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {appointment.scheduledTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">
                            {appointment.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={appointment.status} />
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No appointments found
              </h3>
              <p className="text-gray-500">
                There are no appointments scheduled for{" "}
                {format(selectedDate, "MMMM d, yyyy")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Keep existing helper components (StatCard, QueueStat, StatusBadge)...

export default Appointment;

const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg p-4 flex items-center justify-between`}>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
    <div className="p-3 rounded-full bg-white">{icon}</div>
  </div>
);

const QueueStat = ({ label, value }) => (
  <div className="text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold mt-1">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};
