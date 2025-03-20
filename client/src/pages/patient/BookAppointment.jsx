import { Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function BookAppointment() {
  const [formData, setFormData] = useState({
    department: "general",
    doctor: "",
    date: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/doctor/get-all-doctors/${
            formData.department
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDoctors(res.data.doctors);
      } catch (error) {
        setDoctors([]);
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [formData.department]);

  // Handle input changes
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setFormData({ ...formData, time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/appointment/create`,
        {
          doctorId: formData.doctor,
          department: formData.department,
          date: formData.date,
          reason: formData.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Appoinment Booked successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setFormData({
        department: "general",
        doctor: "",
        date: "",
        reason: "",
      });
      setLoading(false);
    }
  };
  console.log(formData);
  return (
    <div className="h-full w-full px-2 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 bg-white lg:space-y-6">
        <div className="border space-y-6 border-blue-400/70 lg:px-8 md:p-6 p-4 rounded-lg">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
              Appointment Booking
            </h1>
            <p className="mt-1 text-sm sm:text-base text-blue-500">
              Please fill in the form below to book an appointment
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Selection */}
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={onChange}
                className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select department</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="psychiatry">Psychiatry</option>
                <option value="gynecology">Gynecology</option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="dentistry">Dentistry</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-2">
                Doctor
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={onChange}
                className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {`${doc.firstName || doc.name} ${doc.lastName || ""}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-2">
                Select Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={onChange}
                className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-2">
                Reason for Visit
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={onChange}
                placeholder="Please describe your symptoms or reason for appointment"
                className="w-full px-3 py-2 outline-none bg-blue-50 border border-blue-200 rounded-md text-blue-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows="4"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              {!loading ? (
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-2.5 text-sm sm:text-base  bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-500 hover:to-teal-500  font-medium rounded-lg transition-all`}
                >
                  <span className="font-semibold">Book Apponiment</span>
                </button>
              ) : (
                <button
                  disabled={!loading}
                  className="bg-blue-600 py-2 gap-2 rounded-md flex items-center text-white justify-center w-full text-center"
                >
                  <div className="w-4 h-4 border-2 border-t-transparent border-white border-solid rounded-full animate-spin" />
                  <span className="text-sm font-[500]">Booking...</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
