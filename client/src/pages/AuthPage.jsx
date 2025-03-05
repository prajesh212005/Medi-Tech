import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase } from "lucide-react"; // Import icons

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Choose Your Role</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Patient Card */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate("/login/patient")}
        >
          <div className="w-24 h-24 bg-blue-100 flex items-center justify-center rounded-full mb-4">
            <User className="text-blue-600 w-12 h-12" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Patient</h2>
          <p className="text-gray-600 mt-2 text-center">Book appointments and track medical records</p>
        </div>

        {/* Receptionist Card */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate("/login/receptionist")}
        >
          <div className="w-24 h-24 bg-green-100 flex items-center justify-center rounded-full mb-4">
            <Briefcase className="text-green-600 w-12 h-12" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Receptionist</h2>
          <p className="text-gray-600 mt-2 text-center">Manage hospital schedules and patient records</p>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
