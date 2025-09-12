import React from "react";
import MenuItem from "./MenuItem";

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  return (
    <nav>
      <ul>
        <MenuItem label="Dashboard" value="Dashboard" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        <MenuItem label="Bill" value="Bill" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        <MenuItem label="Veg List" value="VegList" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        <MenuItem label="Farmer List" value="FarmerList" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        <MenuItem label="Merchant List" value="MerchantList" activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      </ul>
    </nav>
  );
};

export default Sidebar;
