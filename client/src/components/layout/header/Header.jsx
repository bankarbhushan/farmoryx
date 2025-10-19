// Header.jsx
import React from "react";
import { GiFarmTractor } from "react-icons/gi";
import { Link } from "react-router";
  

const Header = () => {

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-green-800 text-white flex items-center justify-between px-6 shadow-md z-50">
      <GiFarmTractor className="text-4xl cursor-pointer" />

      <div className="text-xl font-bold">FarmoryX</div>
      <Link className="px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-600 transition" to={"/"}>Login</Link>
    </header>
  );
};

export default Header;
