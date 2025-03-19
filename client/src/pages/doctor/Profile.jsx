import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { CirclePlus, CircleX, Trash2 } from "lucide-react";
import { FaCheck, FaTimes } from "react-icons/fa";

function DoctorProfile() {
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    specialization: "",
    qualification: "",
    experience: "",
    contactNumber: "",
    availability: [],
  });
  const [loading, setLoading] = useState(false);
  const [originalDoctor, setOriginalDoctor] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/api/doctor/get-profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        const data = response.data.doctor;

        setDoctor({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          specialization: data.specialization || "",
          qualification: data.qualification || "",
          experience: data.experience || "",
          contactNumber: data.contactNumber || "",
          availability: data.availability || [],
        });
        setOriginalDoctor({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          specialization: data.specialization || "",
          qualification: data.qualification || "",
          experience: data.experience || "",
          contactNumber: data.contactNumber || "",
          availability: data.availability || [],
        });
      } catch (error) {}
    };

    fetchProfile();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setDoctor({
      ...doctor,
      [name]: value,
    });
  };

  const onAvailabilityChange = (index, field, value) => {
    const updatedAvailability = doctor.availability.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    setDoctor({
      ...doctor,
      availability: updatedAvailability,
    });
  };

  const onAddAvailability = () => {
    const incompleteSlot = doctor.availability.some(
      (slot) =>
        !slot.day ||
        !slot.startTime ||
        !slot.endTime ||
        slot.isAvailable === null
    );

    if (incompleteSlot) {
      toast.error("Previos availability slot is incomplete");
      return;
    }

    const newAvailability = [
      ...doctor.availability,
      {
        day: "",
        startTime: "",
        endTime: "",
        isAvailable: false,
      },
    ];
    setDoctor({ ...doctor, availability: newAvailability });
  };

  const onRemoveAvailability = (index) => {
    const updatedAvailability = doctor.availability.filter(
      (_, i) => i !== index
    );
    setDoctor({ ...doctor, availability: updatedAvailability });
  };

  const hasChanges = () => {
    return JSON.stringify(doctor) !== JSON.stringify(originalDoctor);
  };

  const saveChanges = async () => {
    if (!hasChanges()) {
      toast.error("No changes detected");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_URL}/api/doctor/profile`,
        doctor,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data.doctor;
      setDoctor({
        firstName: data.firstName,
        lastName: data.lastName,
        specialization: data.specialization,
        qualification: data.qualification,
        experience: data.experience,
        contactNumber: data.contactNumber,
        availability: data.availability,
      });
      setOriginalDoctor({
        firstName: data.firstName,
        lastName: data.lastName,
        specialization: data.specialization,
        qualification: data.qualification,
        experience: data.experience,
        contactNumber: data.contactNumber,
        availability: data.availability,
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
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 bg-white lg:space-y-6">
        <div className="border space-y-6 border-blue-400/70 lg:px-8 md:p-6 p-4 rounded-lg">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
              Welcome to your profile
            </h1>
            <p className="mt-1 text-sm sm:text-base text-blue-500">
              Here you can view and edit your profile
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              autoComplete="off"
              value={doctor.firstName}
              onChange={onChange}
              placeholder="First Name"
              className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              value={doctor.lastName}
              onChange={onChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Specialization
            </label>
            <select
              name="specialization"
              value={doctor.specialization}
              onChange={onChange}
              className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select specialization</option>
              <option value="cardiology">cardiology</option>
              <option value="dermatology">dermatology</option>
              <option value="neurology">neurology</option>
              <option value="orthopedics">orthopedics</option>
              <option value="pediatrics">pediatrics</option>
              <option value="psychiatry">psychiatry</option>
              <option value="gynecology">gynecology</option>
              <option value="ophthalmology">ophthalmology</option>
              <option value="dentistry">dentistry</option>
              <option value="general">general</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              autoComplete="off"
              value={doctor.qualification}
              onChange={onChange}
              placeholder="Qualification"
              className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              autoComplete="off"
              value={doctor.experience}
              onChange={onChange}
              placeholder="Experience"
              min="0"
              className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-600 mb-1">
              Contact Number
            </label>
            <input
              type="number"
              name="contactNumber"
              value={doctor.contactNumber}
              onChange={onChange}
              placeholder="Contact Number"
              maxLength={10}
              className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-600">
                Availability
              </h2>
              <button
                onClick={onAddAvailability}
                className="text-sm  px-4 py-2 flex gap-1 cursor-pointer hover:underline items-center  text-blue-600 rounded-md "
              >
                <CirclePlus size={16} className="" />
                Add Availability
              </button>
            </div>
            {doctor.availability.map((slot, index) => (
              <div
                key={index}
                className="flex gap-3 flex-col p-3 border mt-3 border-blue-600/30 rounded-md"
              >
                <div className="flex flex-col gap-3 justify-center">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onRemoveAvailability(index)}
                      className="  text-red-600 rounded-md  sm:p-2 hover:text-red-300 cursor-pointer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <select
                    name="day"
                    value={slot.day}
                    onChange={(e) =>
                      onAvailabilityChange(index, "day", e.target.value)
                    }
                    className="w-full px-3 py-2 outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Day</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                  <div className="flex gap-3 flex-col md:flex-row">
                    <select
                      name="startTime"
                      value={slot.startTime}
                      onChange={(e) =>
                        onAvailabilityChange(index, "startTime", e.target.value)
                      }
                      className="w-full px-3 py-2 outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Start Time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>

                    <select
                      name="endTime"
                      value={slot.endTime}
                      onChange={(e) =>
                        onAvailabilityChange(index, "endTime", e.target.value)
                      }
                      className="w-full px-3 py-2 outline-none bg-blue-500/5 border border-blue-500/20 rounded-md text-blue-600 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select End Time</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-1 md:pt-3 lg:pt-4">
            {!loading ? (
              <button
                onClick={saveChanges}
                disabled={!hasChanges()}
                className={`w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base  bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-500 hover:to-teal-500  font-medium rounded-lg transition-all`}
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

export default DoctorProfile;
