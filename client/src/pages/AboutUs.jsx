import React from 'react';
import { Briefcase, Users, Target, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Us</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          We are dedicated to transforming hospital management with cutting-edge technology, 
          optimizing workflows for better patient care.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-blue-500 transition hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-blue-600 flex items-center">
            <Target className="mr-2 text-blue-400" /> Our Mission
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            To revolutionize healthcare efficiency by providing hospitals with AI-powered 
            solutions for better patient flow management.
          </p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-xl border-l-4 border-purple-500 transition hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-purple-600 flex items-center">
            <CheckCircle className="mr-2 text-purple-400" /> Our Vision
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            A world where every hospital operates seamlessly, ensuring faster care and 
            enhanced patient experiences.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-semibold text-gray-800">
          Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Our Team</span>
        </h2>
        <p className="text-lg text-gray-600 mt-4">Experts dedicated to healthcare transformation</p>
        
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {["Alice Doe", "Bob Smith", "Charlie Johnson"].map((name, index) => (
            <div 
              key={index} 
              className="bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-6 text-center border border-gray-200 
                         hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 flex items-center justify-center rounded-full">
                <Users className="text-blue-600 w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{name}</h3>
              <p className="text-gray-500">Healthcare Tech Specialist</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
