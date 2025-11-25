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
    <Wrapper className="bg-[#FFFFFF] border border-[#E6E9EA] shadow-sm font-inter">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#12202E]">Dashboard</h1>
        <p className="text-sm font-extralight text-[#94A3B8] mt-1">
          Overview of daily activities, totals and business performance.
        </p>
      </div>

      {/* Today’s Entries */}
      <h2 className="text-lg font-medium text-[#12202E] mb-3">Today’s Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <Card
          title="Today’s Farmer Entry"
          value="12"
          icon={<FaTractor />}
          className="text-[#16C79A]"
        />

        <Card
          title="Today’s Merchant Entry"
          value="8"
          icon={<FaUsers />}
          className="text-[#16C79A]"
        />

        <Card
          title="Amount Paid to Farmers"
          value="₹12,400"
          icon={<FaMoneyBillWave />}
          className="text-[#11D18C]"
        />

        <Card
          title="Amount Paid to Merchants"
          value="₹8,900"
          icon={<FaMoneyBillWave />}
          className="text-[#11D18C]"
        />

      </div>

      {/* Totals */}
      <h2 className="text-lg font-medium text-[#12202E] mb-3">Totals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

        <Card
          title="Total Farmers"
          value="150"
          icon={<FaUsers />}
          className="text-[#F4C430]"
        />

        <Card
          title="Total Merchants"
          value="85"
          icon={<FaUsers />}
          className="text-[#F4C430]"
        />

        <Card
          title="Total Vegetables"
          value="65"
          icon={<FaLeaf />}
          className="text-[#16C79A]"
        />

      </div>

      {/* Revenue Section */}
      <h2 className="text-lg font-medium text-[#12202E] mb-3">Revenue</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <Card
          title="Previous Month Revenue"
          value="₹2,50,000"
          icon={<FaChartLine />}
          className="text-[#11D18C]"
        />

        <Card
          title="This Month Revenue"
          value="₹3,00,000"
          icon={<FaChartPie />}
          className="text-[#16C79A]"
        />

        <Card
          title="Profit / Loss"
          value="+20%"
          icon={<FaChartLine />}
          className="text-[#16C79A]"
        />

      </div>

    </Wrapper>
  );
};

export default Dashboard;
