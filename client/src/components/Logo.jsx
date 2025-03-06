import React from "react";
import { FaHeartbeat } from "react-icons/fa";

function Logo({ className }) {
  return (
    <div className="flex items-center">
      <FaHeartbeat
        className={`${className} text-blue-600 sm:text-4xl mr-3 animate-pulse`}
      />
      <span className={`${className} font-[800] text-blue-700 tracking-tight`}>
        MediQueue
      </span>
    </div>
  );
}

export default Logo;
