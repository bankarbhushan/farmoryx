import React from "react";
import Wrapper from "../constants/Wrapper";
import Card from "../constants/Card";
import {
  FaTractor,
  FaUsers,
  FaLeaf,
  FaMoneyBillWave,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <Wrapper>
      <h1 className="text-2xl text-center font-bold mb-6 text-gray-800">
        Mauli Dashboard
      </h1>

      {/* Section 1: Today’s Entries */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Today’s Entries
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 justify-center items-center">
        <Card
          title="Today’s Farmer Entry"
          className="text-green-400 aspect-square  flex flex-col justify-center items-center"
          value="12"
          icon={<FaTractor />}
        />
        <Card
          title="Today’s Merchant Entry"
          className="text-green-400 aspect-square  flex flex-col justify-center items-center"
          value="8"
          icon={<FaUsers />}
        />
        <Card
          title="Amount Paid to Farmers"
          className="text-green-400 aspect-square  flex flex-col justify-center items-center"
          value="₹12,400"
          icon={<FaMoneyBillWave />}
        />
        <Card
          title="Amount Paid to Merchants"
          className="text-green-400 aspect-square  flex flex-col justify-center items-center"
          value="₹8,900"
          icon={<FaMoneyBillWave />}
        />
      </div>

      {/* Section 2: Totals */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Totals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 justify-center items-center">
        <Card
          title="Total Farmers"
          className="text-yellow-600 aspect-square  flex flex-col justify-center items-center"
          value="150"
          icon={<FaUsers />}
        />
        <Card
          title="Total Merchants"
          className="text-yellow-600 aspect-square  flex flex-col justify-center items-center"
          value="85"
          icon={<FaUsers />}
        />
        <Card
          title="Total Vegetables"
          className="text-yellow-400 aspect-square  flex flex-col justify-center items-center"
          value="65"
          icon={<FaLeaf />}
        />
      </div>

      {/* Section 3: Revenue */}
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Revenue</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
        <Card
          title="Previous Month Revenue"
          value="₹2,50,000"
          className="text-blue-400 aspect-square  flex flex-col justify-center items-center"
          icon={<FaChartLine />}
        />
        <Card
          title="This Month Revenue"
          value="₹3,00,000"
          icon={<FaChartPie />}
          className="text-blue-400 aspect-square flex flex-col justify-center items-center"
        />
        <Card
          title="Profit / Loss"
          value="+20%"
          icon={<FaChartLine />}
          className="text-blue-400 aspect-square  flex flex-col justify-center items-center"
        />
      </div>
    </Wrapper>
  );
};

export default Dashboard;
