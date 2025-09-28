import React, { useState } from "react";
import LoginImage from "../../../assets/Images/LoginImage";
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 bg-green-50">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            FarmoryX Login
          </h2>

          {/* Role Select */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option disabled selected>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="broker">Broker</option>
              <option value="merchant">Merchant</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-green-600"
              >
                {showPassword ? (
                  <LuEye className="text-xl" />
                ) : (
                  <FaRegEyeSlash className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="button"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-green-50">
        <LoginImage />
      </div>
    </div>
  );
};

export default Login;
