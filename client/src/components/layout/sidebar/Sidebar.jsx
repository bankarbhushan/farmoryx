  import React from "react";
  import { NavLink } from "react-router-dom";

  const Sidebar = () => {
    return (
      <aside
        className="
          fixed left-0 top-[73px]
          w-[280px] h-[calc(100vh-73px)]
          bg-[#FAFAFB]
          border-r border-[#E6E9EA]
          p-4 overflow-y-auto
        "
      >
        <nav>
          <ul className="space-y-2">
            <MenuItem label="Wel Come" to="/dashbord/greet" />
            <MenuItem label="Dashboard" to="/dashbord/dashboard" />
            <MenuItem label="Bill" to="/dashbord/bill" />
            <MenuItem label="Veg List" to="/dashbord/veglist" />
            <MenuItem label="Farmer List" to="/dashbord/farmerlist" />
            <MenuItem label="Merchant List" to="/dashbord/merchantlist" />
            <MenuItem label="Bill List" to="/dashbord/billlist" />
          </ul>
        </nav>
      </aside>
    );
  };

  const MenuItem = ({ label, to }) => {
    return (
      <li>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `cursor-pointer px-4 py-2 rounded-md font-semibold font-sans flex items-center gap-3 
            transition-all duration-200
            ${isActive ? "text-[#17CF91] bg-[#17CF911A]" : "text-gray-700 hover:bg-gray-200"}`
          }
        >
          {label}
        </NavLink>
      </li>
    );
  };

  export default Sidebar;
