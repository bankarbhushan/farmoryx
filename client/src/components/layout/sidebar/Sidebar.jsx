import React from "react";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <nav>
      <h2 className="text-xl mb-4 font-semibold">Menu</h2>
      <ul>
        <li
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={() => setActiveComponent("Dashbord")}
        >
          Dashboard
        </li>
        <li
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={() => setActiveComponent("Bill")}
        >
          Bill
        </li>
        <li
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={() => setActiveComponent("VegList")}
        >
          Veg List
        </li>
           <li
          className="cursor-pointer hover:bg-gray-700 p-2 rounded"
          onClick={() => setActiveComponent("FarmerList")}
        >
          Farmer List
        </li>
        <li className="cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => setActiveComponent("MerchantList")}>
              Merchant List
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
