import React, { useState } from "react";
import {
  Users,
  Clock,
  UserPlus,
  Search,
  MoreVertical,
  PlayCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

function QueueManagement() {
  // Static queue data
  const [queue] = useState([
    {
      _id: "1",
      tokenNumber: "A001",
      patient: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
      },
      scheduledTime: "09:00 AM",
      department: "General",
      doctor: {
        name: "Dr. Smith",
        specialization: "General Medicine",
      },
      status: "waiting",
    },
    {
      _id: "2",
      tokenNumber: "A002",
      patient: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1234567891",
      },
      scheduledTime: "09:30 AM",
      department: "Cardiology",
      doctor: {
        name: "Dr. Johnson",
        specialization: "Cardiologist",
      },
      status: "in-progress",
    },
    {
      _id: "3",
      tokenNumber: "A003",
      patient: {
        name: "Mike Wilson",
        email: "mike@example.com",
        phone: "+1234567892",
      },
      scheduledTime: "10:00 AM",
      department: "Orthopedics",
      doctor: {
        name: "Dr. Brown",
        specialization: "Orthopedist",
      },
      status: "completed",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "all",
    department: "all",
  });
  const [search, setSearch] = useState("");

  // Filter queue based on search and filters
  const filteredQueue = queue.filter((item) => {
    const matchesSearch =
      item.patient.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tokenNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filters.status === "all" || item.status === filters.status;

    const matchesDepartment =
      filters.department === "all" ||
      item.department.toLowerCase() === filters.department.toLowerCase();

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Calculate stats
  const stats = {
    total: queue.length,
    waiting: queue.filter((item) => item.status === "waiting").length,
    inProgress: queue.filter((item) => item.status === "in-progress").length,
    completed: queue.filter((item) => item.status === "completed").length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
          <p className="mt-1 text-gray-500">
            Manage patient queue and appointments
          </p>
        </div>

        {/* Stats */}

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 gap-4">
              <div className="w-48">
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full rounded-md border p-2 border-gray-300"
                >
                  <option value="all">All Status</option>
                  <option value="waiting">Waiting</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="w-48">
                <select
                  value={filters.department}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border p-2 border-gray-300"
                >
                  <option value="all">All Departments</option>
                  <option value="general">General</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => alert("Add to Queue clicked")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shrink-0"
            >
              <UserPlus className="h-5 w-5" />
              Add to Queue
            </button>
          </div>
        </div>

        {/* Queue Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Token
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQueue.map((item) => (
                  <QueueRow key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          {filteredQueue.length === 0 && (
            <EmptyState
              message="No patients found"
              icon={<Users className="h-12 w-12 text-gray-400" />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const QueueRow = ({ item }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2.5 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
          {item.tokenNumber}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {item.patient.name}
        </div>
        <div className="text-xs text-gray-500">{item.patient.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.scheduledTime}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item.department}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{item.doctor.name}</div>
        <div className="text-xs text-gray-500">
          {item.doctor.specialization}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={item.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => alert(`Actions for ${item.patient.name}`)}
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    waiting: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-xl p-6 flex items-center justify-between`}>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    </div>
    <div className="p-3 bg-white rounded-full">{icon}</div>
  </div>
);

const EmptyState = ({ message, icon }) => (
  <div className="text-center py-12">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
  </div>
);

export default QueueManagement;
