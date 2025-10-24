// src/constants/Card.jsx
import React from "react";

const Card = ({ title, value, icon, className }) => {
  return (
    <div className={`bg-white h-48 border border-gray-200 rounded-lg shadow-sm p-5 flex justify-center items-center gap-4`}>
      
      {/* {icon && <div className={`text-3xl text-green-600 ${className}}`>{icon}</div>} */}
      {
        icon && <div className={`text-3xl ${className}`}>{icon} </div>
      }
      <div>
        <h3 className="text-sm text-gray-500 font-medium ">{title}</h3>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default Card;
