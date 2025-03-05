import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent from ${formData.name}`);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Us</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4">We would love to hear from you. Get in touch!</p>
      </div>

      {/* Contact Details */}
      <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
        {[
          { icon: <Mail className="text-blue-600 w-12 h-12 mx-auto" />, title: "Email", detail: "support@hospitalflow.com" },
          { icon: <Phone className="text-blue-600 w-12 h-12 mx-auto" />, title: "Phone", detail: "+1 (800) 123-4567" },
          { icon: <MapPin className="text-blue-600 w-12 h-12 mx-auto" />, title: "Location", detail: "123 Hospital St, New York, NY" }
        ].map((item, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-6 border border-gray-200
                                      hover:shadow-2xl hover:border-blue-500 transition-all hover:scale-105">
            {item.icon}
            <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-600">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="mt-12 bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-8 max-w-2xl mx-auto border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800">Send us a message</h3>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required 
            className="w-full border-gray-300 p-3 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition" 
            onChange={handleChange} />
          <input type="email" name="email" placeholder="Your Email" required 
            className="w-full border-gray-300 p-3 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition" 
            onChange={handleChange} />
          <textarea name="message" placeholder="Your Message" rows="4" required 
            className="w-full border-gray-300 p-3 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition" 
            onChange={handleChange} />
          <button type="submit" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center mx-auto shadow-lg hover:opacity-90 transition-all">
            Send Message <Send className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );    
};

export default ContactUs;
