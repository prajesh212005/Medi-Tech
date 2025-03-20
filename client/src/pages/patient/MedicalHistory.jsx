import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

function MedicalHistory() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/appointment/medical-history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRecords(response.data.records);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, []);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      searchQuery === "" ||
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Group records by month and year
  const groupedRecords = filteredRecords.reduce((groups, record) => {
    const date = new Date(record.date);
    const monthYear = format(date, "MMMM yyyy");
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(record);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading medical records...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "yellow";
      case "scheduled":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Search */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Medical History
            </h1>
            <p className="text-gray-600 mt-1">
              {records.length} consultation{records.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by doctor, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 px-4 py-2 rounded-lg border border-blue-400 outline-none placeholder-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Records by Month */}
      {Object.entries(groupedRecords).map(([monthYear, monthRecords]) => (
        <div key={monthYear} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {monthYear}
          </h2>
          <div className="space-y-4">
            {monthRecords.map((record) => (
              <div
                key={record._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-blue-600 text-lg font-semibold">
                          {record.doctor.split(" ")[1][0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {record.doctor}
                        </h3>
                        <p className="text-sm text-blue-600 capitalize">
                          {record.specialization}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(
                        record.status
                      )}-100 text-${getStatusColor(
                        record.status
                      )}-800 capitalize`}
                    >
                      {record.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {format(new Date(record.date), "EEEE, MMMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
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
                        <span>{record.scheduledTime}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span className="capitalize">{record.department}</span>
                      </div>
                    </div>

                    {record.consultationDetails && (
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium text-gray-700 flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            Consultation Details
                          </h4>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {/* Token Number */}
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-500">
                                Token
                              </span>
                              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-blue-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <p className="mt-1 text-lg font-semibold text-gray-800">
                              {record.consultationDetails.tokenNumber}
                            </p>
                          </div>

                          {/* Start Time */}
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-500">
                                Started At
                              </span>
                              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-green-500"
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
                            </div>
                            <p className="mt-1 text-lg font-semibold text-gray-800">
                              {record.consultationDetails.actualStartTime ||
                                "N/A"}
                            </p>
                          </div>

                          {/* End Time */}
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-500">
                                Ended At
                              </span>
                              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-red-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <p className="mt-1 text-lg font-semibold text-gray-800">
                              {record.consultationDetails.actualEndTime ||
                                "N/A"}
                            </p>
                          </div>
                        </div>

                        {record.consultationDetails.duration && (
                          <div className="mt-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-500">
                                Total Duration
                              </span>
                              <div className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                                {record.consultationDetails.duration}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {record.reason && (
                    <div className="mt-4 text-sm">
                      <h4 className="font-medium text-gray-700">
                        Reason for Visit
                      </h4>
                      <p className="mt-1 text-gray-600">{record.reason}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredRecords.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="mt-4 text-gray-500">No records found</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalHistory;
