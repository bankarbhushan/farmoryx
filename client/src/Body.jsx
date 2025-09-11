import React, { useState } from "react";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Veglist from "./components/veglist/Veglist";

const Body = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "VegList":
        return <Veglist/>
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex w-full">
      <div className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <Sidebar setActiveComponent={setActiveComponent} />
      </div>

      <div className="flex-1 bg-gray-100 p-6">{renderComponent()}</div>
    </div>
  );
};

export default Body;
