import React from "react";
import MenuItem from "./MenuItem";

const Sidebar = ({ activeComponent, setActiveComponent }) => {
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
          <MenuItem label="Dashboard" value="Dashboard" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          <MenuItem label="Bill" value="Bill" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          <MenuItem label="Veg List" value="VegList" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          <MenuItem label="Farmer List" value="FarmerList" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          <MenuItem label="Merchant List" value="MerchantList" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          <MenuItem label="Bill List" value="BillList" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
