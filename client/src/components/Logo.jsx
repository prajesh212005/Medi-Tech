import React from "react";
import { FaHeartbeat } from "react-icons/fa";

function Logo({ className, font }) {
  return (
    <div className="flex items-center">
      <FaHeartbeat
        className={`${className} text-blue-600 mr-1.5  sm:mr-2  animate-pulse`}
      />
      <span className={`${font} font-[800] text-blue-700 `}>MediQueue</span>
    </div>
  );
}

export default Logo;
