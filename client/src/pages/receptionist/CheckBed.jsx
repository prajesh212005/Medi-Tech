import React, { useState } from "react";
import { Bed, Users, Search, Filter, CheckCircle, XCircle } from "lucide-react";

function CheckBed() {
  const [beds, setBeds] = useState([
    {
      id: "B101",
      type: "General",
      ward: "General Ward",
      floor: "1st Floor",
      status: "Available",
      patient: null,
      admissionDate: null,
      expectedDischarge: null,
    },
    {
      id: "B102",
      type: "ICU",
      ward: "Intensive Care",
      floor: "2nd Floor",
      status: "Occupied",
      patient: {
        name: "John Doe",
        id: "P001",
        admissionDate: "2024-03-20",
        expectedDischarge: "2024-03-25",
      },
    },
    {
      id: "B103",
      type: "Emergency",
      ward: "Emergency Ward",
      floor: "1st Floor",
      status: "Available",
      patient: null,
      admissionDate: null,
      expectedDischarge: null,
    },
  ]);

  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    ward: "all",
  });

  const [search, setSearch] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [patientForm, setPatientForm] = useState({
    name: "",
    id: "",
    admissionDate: "",
    expectedDischarge: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredBeds = beds.filter((bed) => {
    return (
      (filters.type === "all" || bed.type === filters.type) &&
      (filters.status === "all" || bed.status === filters.status) &&
      (filters.ward === "all" || bed.ward === filters.ward) &&
      (bed.id.toLowerCase().includes(search.toLowerCase()) ||
        (bed.patient?.name &&
          bed.patient.name.toLowerCase().includes(search.toLowerCase())))
    );
  });

  const handleAssignBed = (bed) => {
    setSelectedBed(bed);
    setShowAssignModal(true);
  };

  const handleDischarge = (bedId) => {
    setBeds(
      beds.map((bed) => {
        if (bed.id === bedId) {
          return {
            ...bed,
            status: "Available",
            patient: null,
            admissionDate: null,
            expectedDischarge: null,
          };
        }
        return bed;
      })
    );
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    setBeds(
      beds.map((bed) => {
        if (bed.id === selectedBed.id) {
          return {
            ...bed,
            status: "Occupied",
            patient: {
              ...patientForm,
              admissionDate: new Date(
                patientForm.admissionDate
              ).toLocaleDateString(),
              expectedDischarge: new Date(
                patientForm.expectedDischarge
              ).toLocaleDateString(),
            },
          };
        }
        return bed;
      })
    );
    setShowAssignModal(false);
    setPatientForm({
      name: "",
      id: "",
      admissionDate: "",
      expectedDischarge: "",
    });
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Bed Management</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <StatCard
              title="Total Beds"
              value={beds.length}
              color="bg-blue-500"
            />
            <StatCard
              title="Available"
              value={beds.filter((b) => b.status === "Available").length}
              color="bg-green-500"
            />
            <StatCard
              title="Occupied"
              value={beds.filter((b) => b.status === "Occupied").length}
              color="bg-yellow-500"
            />
          </div>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bed Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full border p-2 border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="General">General</option>
                <option value="ICU">ICU</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full border p-2 border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ward
              </label>
              <select
                name="ward"
                value={filters.ward}
                onChange={handleFilterChange}
                className="w-full border p-2 border-gray-300 rounded-md"
              >
                <option value="all">All Wards</option>
                <option value="General Ward">General Ward</option>
                <option value="Intensive Care">Intensive Care</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBeds.map((bed) => (
            <BedCard
              key={bed.id}
              bed={bed}
              onAssign={handleAssignBed}
              onDischarge={handleDischarge}
            />
          ))}
        </div>
      </div>

      {/* Assign Bed Modal */}
      {showAssignModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center">
          <div className="bg-white border border-gray-700/20 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              Assign Bed {selectedBed.id}
            </h2>
            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientForm.name}
                  onChange={(e) =>
                    setPatientForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full border py-2 px-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient ID
                </label>
                <input
                  type="text"
                  value={patientForm.id}
                  onChange={(e) =>
                    setPatientForm((prev) => ({ ...prev, id: e.target.value }))
                  }
                  className="w-full border py-2 px-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admission Date
                </label>
                <input
                  type="date"
                  value={patientForm.admissionDate}
                  onChange={(e) =>
                    setPatientForm((prev) => ({
                      ...prev,
                      admissionDate: e.target.value,
                    }))
                  }
                  className="w-full border py-2 px-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Discharge
                </label>
                <input
                  type="date"
                  value={patientForm.expectedDischarge}
                  onChange={(e) =>
                    setPatientForm((prev) => ({
                      ...prev,
                      expectedDischarge: e.target.value,
                    }))
                  }
                  className="w-full border py-2 px-2 border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Assign Bed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const BedCard = ({ bed, onAssign, onDischarge }) => (
  <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Bed {bed.id}</h3>
        <p className="text-sm text-gray-500">{bed.ward}</p>
      </div>
      <StatusBadge status={bed.status} />
    </div>

    <div className="mt-4 space-y-2">
      <div className="flex items-center text-sm text-gray-600">
        <Bed className="h-4 w-4 mr-2" />
        {bed.type}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Users className="h-4 w-4 mr-2" />
        {bed.patient ? bed.patient.name : "No patient assigned"}
      </div>
      {bed.patient && (
        <>
          <div className="text-sm text-gray-600">
            Admission: {bed.patient.admissionDate}
          </div>
          <div className="text-sm text-gray-600">
            Expected Discharge: {bed.patient.expectedDischarge}
          </div>
        </>
      )}
    </div>

    <div className="mt-4">
      {bed.status === "Available" ? (
        <button
          onClick={() => onAssign(bed)}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Assign Bed
        </button>
      ) : (
        <button
          onClick={() => onDischarge(bed.id)}
          className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Discharge Patient
        </button>
      )}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Available: "bg-green-100 text-green-800",
    Occupied: "bg-red-100 text-red-800",
    Maintenance: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-2 py-1 text-sm font-medium rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`${color} rounded-xl p-6`}>
    <p className="text-2xl font-medium text-white">{title}</p>
    <p className="mt-2 text-3xl font-bold text-white">{value}</p>
  </div>
);

export default CheckBed;
