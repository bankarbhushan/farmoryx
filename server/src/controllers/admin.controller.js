import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js"
import { Admin } from "../models/admin.model.js";
import { uploadOnCloudinary } from "../utils/couldinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
// import {Admin} from "../models/admin.model.js";

// export const createAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await adminModel.findOne({ email });

//     if (existing) {
//       return res.status(400).json({ message: "Email already registered." });
//     }

//     const newAdmin = await adminModel.create({
//       name,
//       email,
//       password,
//     });

//     res.status(201).json({
//       message: `New Admin ${newAdmin.name} created successfully.`,
//       data: newAdmin,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const getAllAdmin = async (req, res) => {
//   try {
//     const feed = await adminModel.find();

//     if (feed.length > 0) {
//       return res.status(200).json({ data: feed });
//     } else {
//       return res.status(404).json({ message: `No Admin found.` });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Unable to fetch Admin`, error: error.message });
//   }
// };

// export const updateAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const { email, role, name } = req.body;

//     if (email || role) {
//       return res
//         .status(403)
//         .json({ message: "Email or role update not allowed." });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: `Invalid admin ID` });
//     }

//     const foundAdmin = await adminModel.findById(id);

//     if (!foundAdmin) {
//       return res.status(404).json({ message: `Admin not found.` });
//     }

//     if (name) {
//       adminModel.name = req.name;
//     }

//     await foundAdmin.save();

//     res.status(200).json({
//       message: `Admin updated successfully.`,
//       data: foundAdmin,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// export const deleteAdmin = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const admin = await adminModel.findById(id);
//     console.log(admin);

//     const foundAdmin = await adminModel.findByIdAndDelete(id);

//     if (!foundAdmin) {
//       return res.status(404).json({ message: `Admin not found` });
//     }
//     res.status(200).json({ message: `${admin.name} deleted successfully` });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

import { asyncHandler } from "../utils/asyncHandler.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if ([name, email, password].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "All fields are required.")
  }
  // for every input we will check the empty value if exist then 
  // it will give true then we show the error

  const existingAdmin = await Admin.findOne({ email })
  if (existingAdmin) throw new ApiError(409, "This email Alredy Exits")


  const admin = await Admin.create({
    name: name.toLowerCase(),
    email,
    password,
    mobile
  })

  const createdAdmin = await Admin.findById(admin._id).select("-password -refreashToken");

  if (!createdAdmin) throw new ApiError(500, "Something wents wrong while creating Admin")

  return res
    .status(201)
    .json(new ApiResponse(201, createdAdmin, "Admin Created Successfully."));

  // first show the api response when save then it will show the 200 
})

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "All fields are required.");
  }
  const notExistAdmin = await Admin.findOne({ email })

  if (notExistAdmin) throw new ApiError(400, "All fields are required.");





})

export { registerAdmin }  