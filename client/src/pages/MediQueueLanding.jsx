import React from "react";
import {
  FaHeartbeat,
  FaUserMd,
  FaCalendarCheck,
  FaEllipsisH,
  FaUser,
} from "react-icons/fa";
import Header from "../components/Header"; // Assuming Header component handles the navbar
import { motion } from "framer-motion";

function MediQueueLanding() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.3 } },
  };

  // Updated testimonials data to match the provided design
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief of Cardiology",
      quote:
        "The patient monitoring system has revolutionized how we deliver care in the ICU. Real-time alerts have helped us intervene faster and improve outcomes.",
      organization: "Metro Hospital",
      avatar: "https://via.placeholder.com/40", // Smaller placeholder image for the icon
    },
    {
      name: "Mark Williams",
      role: "Healthcare IT Director",
      quote:
        "Implementation was seamless, and the training provided was exceptional. Our staff adapted quickly, and we've seen a 30% improvement in workflow efficiency.",
      organization: "Regional Medical Center",
      avatar: "https://via.placeholder.com/40", // Smaller placeholder image for the icon
    },
    {
      name: "Dr. Emily Chen",
      role: "Neurologist",
      quote:
        "The telemedicine platform has allowed us to extend our reach to rural communities that previously had limited access to specialist care.",
      organization: "University Medical Center",
      avatar: "https://via.placeholder.com/40", // Smaller placeholder image for the icon
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      <section className="pt-32 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center"
          >
            <motion.div variants={fadeIn} className="order-2 md:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[700] text-blue-700 mb-2 sm:mb-4 md:mb-6 tracking-tight">
                Advanced Medical Technology for Better Healthcare
              </h1>
              <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-500 mb-4 sm:mb-6 md:mb-8 max-w-lg">
                Innovative solutions that empower healthcare professionals and
                improve patient outcomes through cutting-edge technology.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4">
                <button className="bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md w-full sm:w-auto">
                  Get Started →
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto">
                  Learn More
                </button>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="relative order-1 md:order-2 hidden sm:block md:block"
            >
              <div className=" rounded-2xl h-[200px] sm:h-[300px] md:h-[400px] w-full flex items-center justify-center">
                <img
                  src="/p-3.png"
                  alt="Healthcare Professional"
                  className=" transition-all duration-500 w-full h-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-10 sm:mb-12"
          >
            Our Features
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {/* Feature Card 1 */}
            <motion.div
              variants={fadeIn}
              className="bg-blue-500/10 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <FaUserMd className="text-blue-600 text-4xl sm:text-5xl mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-700">
                Doctor Directory
              </h3>
              <p className="text-blue-700 text-sm sm:text-base">
                Easily find and connect with certified healthcare professionals.
              </p>
            </motion.div>
            {/* Feature Card 2 */}
            <motion.div
              variants={fadeIn}
              className="bg-blue-500/10 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <FaCalendarCheck className="text-blue-600 text-4xl sm:text-5xl mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-700">
                Smart Scheduling
              </h3>
              <p className="text-blue-600 text-sm sm:text-base">
                Book appointments seamlessly with real-time availability.
              </p>
            </motion.div>
            {/* Feature Card 3 */}
            <motion.div
              variants={fadeIn}
              className="bg-blue-500/10 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <FaHeartbeat className="text-blue-600 text-4xl sm:text-5xl mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-700">
                Health Monitoring
              </h3>
              <p className="text-blue-600 text-sm sm:text-base">
                Track your health metrics with integrated tools.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4">
                About MediQueue
              </h2>
              <p className="text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl text-blue-500 mb-4 sm:mb-6 md:mb-8 max-w-lg">
                MediQueue is a state-of-the-art platform designed to streamline
                healthcare processes. We aim to bridge the gap between patients
                and providers with innovative technology, ensuring better access
                to care and improved health outcomes.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                Read More
              </button>
            </motion.div>
            <motion.div variants={fadeIn} className="relative">
              <img
                src="/p-4.png"
                alt="Healthcare Professional"
                className="  w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What Healthcare Professionals Say Section */}
      <section id="testimonials" className="py-16 md:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl sm:text-4xl font-bold text-blue-700 text-center text-gray-900m mb-2"
          >
            What Healthcare Professionals Say
          </motion.h2>
          <p className="text-center text-blue-600 text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto">
            Hear from the medical professionals who use our technology every
            day.
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-blue-700/10 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-start mb-4">
                  <FaEllipsisH className="text-gray-400 text-xl sm:text-2xl" />
                </div>
                <p className="text-blue-800 text-sm sm:text-base leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-3">
                  <FaUser className="text-blue-600/50 w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full object-cover border-2 border-blue-200" />
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-blue-600 text-xs">
                      {testimonial.role}, {testimonial.organization}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default MediQueueLanding;
