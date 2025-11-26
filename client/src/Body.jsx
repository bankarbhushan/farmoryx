import React from "react";
import Sidebar from "./components/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex min-h-screen w-full bg-[#ffff]">
      <Sidebar />

      <main className="ml-[280px] p-6 w-full bg-[#F8FAF8] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Body;
