// Header.jsx
import React, { useContext } from "react";
import { GiFarmTractor } from "react-icons/gi";
import { Link } from "react-router";
import UserContext from "../../../context/userContext";

const Header = () => {
  const { userName } = useContext(UserContext);

  return (
    <header className="
      fixed top-0 left-0 right-0 
      h-[73px] bg-white text-[#0B1220]
      flex items-center justify-between
      px-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]
      z-50 border-b border-[#E6E9EA]
    ">
      {/* Logo + Title */}
      <div className="flex gap-3 items-center">
        <GiFarmTractor className="text-4xl text-[#16C79A]" />
        <h1 className="text-xl font-semibold  text-[#16C79A] tracking-wide">FarmoryX</h1>
      </div>

      {/* User + Button */}
      <div className="flex gap-5 items-center">
        <p className="font-medium text-[#12202E]">
          Welcome, <span className="text-[#16C79A] font-semibold">{userName}</span>
        </p>

        <Link
          to="/"
          className="
            px-4 py-2 rounded-lg 
            font-medium text-white 
            bg-[#16C79A] 
            shadow hover:bg-[#11D18C] 
            transition-all
          "
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
