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
    <div className="flex min-h-screen w-full bg-[#ffff]">
      {/* Sidebar */}
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />

      {/* Main Content */}
      <main className="ml-[280px]  p-6 w-full bg-[#F8FAF8] min-h-screen">
        {renderComponent()}
      </main>
    </div>
  );
};

export default Body;
