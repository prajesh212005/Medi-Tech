import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import withAuthRedirect from "../../components/withAuthRedirect ";
function Profile() {
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: "",
    medicalHistory: [],
    emergencyContact: {
      name: "",
      relationship: "",
      contactNumber: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [originalPatient, setOriginalPatient] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/patient/get-profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        const data = response.data.patient;
        setPatient({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          contactNumber: data.contactNumber,
          address: data.address,
          emergencyContact: {
            name: data.emergencyContact.name,
            relationship: data.emergencyContact.relationship,
            contactNumber: data.emergencyContact.contactNumber,
          },
        });
        setOriginalPatient({
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          contactNumber: data.contactNumber,
          address: data.address,
          emergencyContact: {
            name: data.emergencyContact.name,
            relationship: data.emergencyContact.relationship,
            contactNumber: data.emergencyContact.contactNumber,
          },
        });
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value,
    });
  };

  const onEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      emergencyContact: {
        ...patient.emergencyContact,
        [name]: value,
      },
    });
  };

  const hasChanges = () => {
    return JSON.stringify(patient) !== JSON.stringify(originalPatient);
  };

  const saveChanges = async () => {
    if (!hasChanges()) {
      toast.error("No changes detected");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_URL}/api/patient/profile`,
        patient,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data.patient;
      setPatient({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        contactNumber: data.contactNumber,
        address: data.address,
        emergencyContact: {
          name: data.emergencyContact.name,
          relationship: data.emergencyContact.relationship,
          contactNumber: data.emergencyContact.contactNumber,
        },
      });
      setOriginalPatient({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        contactNumber: data.contactNumber,
        address: data.address,
        emergencyContact: {
          name: data.emergencyContact.name,
          relationship: data.emergencyContact.relationship,
          contactNumber: data.emergencyContact.contactNumber,
        },
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full w-full px-2 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
            Welcome to your profile
          </h1>
          <p className="mt-1 text-sm sm:text-base text-blue-500">
            Here you can view and edit your profile
          </p>
        </div>
        <div className="border space-y-6 border-blue-400/70 lg:p-8 md:p-6 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              autoComplete="off"
              value={patient.firstName}
              onChange={onChange}
              placeholder="firstname"
              className="w-full px-3 py-2 text-sm sm:text-base outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 placeholder-blue-500 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              autoComplete="off"
              value={patient.lastName}
              onChange={onChange}
              placeholder="lastname"
              className="w-full px-3 py-2 text-sm sm:text-base outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 placeholder-blue-500 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={patient.dateOfBirth}
              onChange={onChange}
              className="w-full px-3 py-2 outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-row max-md:flex-col w-full justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={patient.gender}
                onChange={onChange}
                className="w-full px-3 py-2 outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Contact Number */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Contact Number
              </label>
              <input
                type="number"
                name="contactNumber"
                value={patient.contactNumber}
                onChange={onChange}
                placeholder="Contact Number"
                maxLength={10}
                className="w-full px-3 py-2 outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 placeholder-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={patient.address}
              onChange={onChange}
              placeholder="Address"
              className="w-full px-3 py-2 text-sm sm:text-base outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 placeholder-blue-500 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-600">
              Emergency Contact
            </h2>
            <div className="flex gap-3 flex-col mt-3">
              <input
                type="text"
                name="name"
                value={patient.emergencyContact.name}
                onChange={onEmergencyContactChange}
                placeholder="Name"
                className="w-full px-3 py-2 text-sm sm:text-base outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 placeholder-blue-500 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <div className="flex flex-row max-md:flex-col gap-3">
                <input
                  type="text"
                  name="relationship"
                  value={patient.emergencyContact.relationship}
                  onChange={onEmergencyContactChange}
                  placeholder="Relationship"
                  className="w-full px-3 py-2 text-sm sm:text-base outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 placeholder-blue-500 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="number"
                  name="contactNumber"
                  value={patient.emergencyContact.contactNumber}
                  onChange={onEmergencyContactChange}
                  placeholder="Contact Number"
                  maxLength={10}
                  className="w-full px-3 py-2 text-sm sm:text-base outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 placeholder-blue-500 focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-1 md:pt-3 lg:pt-4">
            {!loading ? (
              <button
                onClick={saveChanges}
                disabled={!hasChanges()}
                className={`w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base font-medium rounded-lg transition-all ${
                  hasChanges()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
            ) : (
              <button className="w-full sm:w-auto flex gap-2 items-center px-6 py-2.5 text-sm sm:text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all">
                <div className="w-4 h-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin" />
                <span className="text-sm font-[500]">Saving Changes...</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
