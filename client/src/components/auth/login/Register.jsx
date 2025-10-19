import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa6";
import Register_Image from "../../../assets/Images/Register_Image" 
import { Link } from "react-router-dom";

const Register = () =>{
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const Input = ({ label, type, placeholder }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      />
    </div>
  );

  const PasswordInput = ({ label }) => (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-green-600"
        >
          {showPassword ? <LuEye className="text-xl" /> : <FaRegEyeSlash className="text-xl" />}
        </button>
      </div>
    </div>
  );

  const renderFields = () => {
    switch (role) {
      case "admin":
        return (
          <>
            <Input label="Name" type="text" placeholder="Enter full name" />
            <Input label="Email" type="email" placeholder="Enter email" />
            <PasswordInput label="Password" />
            <Input label="Mobile" type="tel" placeholder="Enter mobile number" />
            <Input label="Avatar URL" type="url" placeholder="Profile image URL (optional)" />
            <Input label="Documents (optional)" type="file" />
          </>
        );
      case "farmer":
        return (
          <>
            <Input label="Name" type="text" placeholder="Enter farmer name" />
            <Input label="Phone" type="tel" placeholder="Enter mobile number" />
            <Input label="Village" type="text" placeholder="Village" />
          </>
        );
      case "merchant":
      case "broker":
        return (
          <>
            <Input label="Name" type="text" placeholder="Enter name" />
            <Input label="Phone" type="tel" placeholder="Enter mobile number" />
            <Input label="Email" type="email" placeholder="Enter email" />
            <PasswordInput label="Password" />
            <Input label="Business Name" type="text" placeholder="Business/Shop Name" />
            <Input label="Street" type="text" placeholder="Street Address" />
            <Input label="City" type="text" placeholder="City" />
            <Input label="State" type="text" placeholder="State" />
            <Input label="Pincode" type="text" placeholder="Pincode" />
            <Input label="Photo URL" type="url" placeholder="Logo / Photo URL" />
          </>
        );
      default:
        return <p className="text-gray-500">Please select a role to continue.</p>;
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-w-full">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 bg-green-50">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
            Register as {role || "User"}
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Role</label>
            <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            >
            <option value="" disabled>
                -- Select Role --
            </option>
            <option value="admin">Admin</option>
            <option value="farmer">Farmer</option>
            <option value="merchant">Merchant</option>
            <option value="broker">Broker</option>
            </select>
          </div>
          <form className="space-y-5">{renderFields()}</form>

          <Link to={"/"}>
            <button
                type="submit"
                className="mt-6 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
              >
              Register
            </button>
          </Link>
        </div>
      </div>
      <div className="pt-6 md:flex md:w-1/2 items-center md:items-start justify-center bg-green-50">
        <Register_Image />
      </div>
    </div>
  );
};

export default Register;
