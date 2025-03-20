import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaBed,
  FaUsers,
  FaCalendarAlt,
  FaUserMd,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [queueData, setQueueData] = useState([
    {
      id: "P-1001",
      name: "James Wilson",
      time: "09:15 AM",
      status: "Waiting",
      priority: "Normal",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: "P-1002",
      name: "Emma Thompson",
      time: "09:30 AM",
      status: "In Progress",
      priority: "High",
      doctor: "Dr. Emily Chen",
    },
    {
      id: "P-1003",
      name: "Robert Garcia",
      time: "09:45 AM",
      status: "Waiting",
      priority: "Normal",
      doctor: "Dr. John Miller",
    },
    {
      id: "P-1004",
      name: "Lisa Brown",
      time: "10:00 AM",
      status: "Waiting",
      priority: "Low",
      doctor: "Dr. Sarah Johnson",
    },
    {
      id: "P-1005",
      name: "Michael Davis",
      time: "10:15 AM",
      status: "Scheduled",
      priority: "Normal",
      doctor: "Dr. Emily Chen",
    },
  ]);

  const [bedData, setBedData] = useState([
    {
      id: "B-101",
      type: "General",
      status: "Available",
      floor: "1st Floor",
      ward: "General Ward",
    },
    {
      id: "B-102",
      type: "General",
      status: "Occupied",
      floor: "1st Floor",
      ward: "General Ward",
      patient: "Thomas Lee",
    },
    {
      id: "B-103",
      type: "ICU",
      status: "Available",
      floor: "2nd Floor",
      ward: "Intensive Care",
    },
    {
      id: "B-104",
      type: "ICU",
      status: "Occupied",
      floor: "2nd Floor",
      ward: "Intensive Care",
      patient: "Sarah Miller",
    },
    {
      id: "B-105",
      type: "Pediatric",
      status: "Available",
      floor: "3rd Floor",
      ward: "Pediatric Ward",
    },
    {
      id: "B-106",
      type: "Maternity",
      status: "Occupied",
      floor: "3rd Floor",
      ward: "Maternity Ward",
      patient: "Jessica Adams",
    },
  ]);

  const todaysPatients = queueData.length;
  const availableBeds = bedData.filter(
    (bed) => bed.status === "Available"
  ).length;
  const queueLength = queueData.filter(
    (patient) => patient.status === "Waiting"
  ).length;
  const doctorsAvailable = 5;

  // Navigation functions
  const goToNewPatient = () => {
    navigate("/reception/add-patient");
  };

  const goToAssignBed = () => {
    navigate("/reception/check-bed");
  };

  const goToNewAppointment = () => {
    navigate("/appointment");
  };

  const goToAllPatients = () => {
    navigate("/manage-queue");
  };

  const handleViewPatient = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  const handleUpdatePatient = (patientId) => {
    navigate(`/update-patient/${patientId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Summary Cards - Matching UI Mockup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Today's Patients Card */}
        <div className="bg-blue-500 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Today's Patients</h3>
              <FaUsers className="text-2xl text-white opacity-80" />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{todaysPatients}</span>
            </div>
          </div>
        </div>

        {/* Available Beds Card */}
        <div className="bg-green-500 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Available Beds</h3>
              <FaBed className="text-2xl text-white opacity-80" />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{availableBeds}</span>
            </div>
          </div>
        </div>

        {/* Queue Length Card */}
        <div className="bg-yellow-500 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Queue Length</h3>
              <FaUsers className="text-2xl text-white opacity-80" />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{queueLength}</span>
            </div>
          </div>
        </div>

        {/* Doctors Available Card */}
        <div className="bg-purple-500 rounded-xl shadow-md overflow-hidden">
          <div className="p-4 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Doctors Available</h3>
              <FaUserMd className="text-2xl text-white opacity-80" />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{doctorsAvailable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h3 className="text-lg font-semibold text-blue-700 mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 flex flex-col items-center"
            onClick={goToNewPatient}
          >
            <FaUserPlus className="text-blue-600 text-xl mb-2" />
            <span className="text-sm text-blue-700">New Patient</span>
          </button>
          <button
            className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 flex flex-col items-center"
            onClick={goToAssignBed}
          >
            <FaBed className="text-blue-600 text-xl mb-2" />
            <span className="text-sm text-blue-700">Assign Bed</span>
          </button>
          <button
            className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 flex flex-col items-center"
            onClick={goToNewAppointment}
          >
            <FaCalendarAlt className="text-blue-600 text-xl mb-2" />
            <span className="text-sm text-blue-700">New Appointment</span>
          </button>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-blue-700 mb-3">
          Recent Patients
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {queueData.slice(0, 3).map((patient) => (
                <tr key={patient.id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                    {patient.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {patient.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        patient.status === "Waiting"
                          ? "bg-yellow-100 text-yellow-800"
                          : patient.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleViewPatient(patient.id)}
                      >
                        View
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleUpdatePatient(patient.id)}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
            onClick={goToAllPatients}
          >
            View All Patients <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
