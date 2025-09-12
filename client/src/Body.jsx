import React, { useState } from "react";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Veglist from "./components/veglist/Veglist";
import FarmerList from "./components/farmerlist/Farmerlist";
import MerchantList from "./components/merchantlist/Merchantlist";
import Bill from "./components/bill/Bill";

const Body = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Bill":
        return <Bill />;
      case "VegList":
        return <Veglist />;
      case "FarmerList":
        return <FarmerList />;
      case "MerchantList":
        return <MerchantList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex w-full">
      <div className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      </div>

      <div className="flex-1 bg-gray-100 p-6">{renderComponent()}</div>
    </div>
  );
};

export default Body;
