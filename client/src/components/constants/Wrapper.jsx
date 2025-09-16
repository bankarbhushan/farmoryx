import React from "react";

const Wrapper = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-3 m-2 border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
