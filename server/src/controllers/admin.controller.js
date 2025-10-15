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

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await Admin.findById(userId)
    const accessToken = user.generateAccessToken(user);
    const refreshToken = user.generateRefreashToken(user);

    // saving the token in the database 
    user.refreashToken = refreshToken;

    // no need to check the password valid just save the user.
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "Unable to generate the access and refresh token.")
  }
}

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
  const { email, mobile, password } = req.body;

  if (!email || !mobile) throw new ApiError(400, "All fields are required")

  const user = await Admin.findOne({ $or: [{ email }, { mobile }] });

  if (!user) throw new ApiError(401, "User does not exit.");

  const validatePassword = isPasswordCorrect(password);
  if (!validatePassword) throw new ApiError(401, "Invalid credential");

  // using this we will get the user refresh token and acces token.
  const { refreshToken, accessToken } = await generateAccessTokenAndRefreshToken(user._id)

  // using select method we can define what we dont need to send to the user
  const loggedInUder = Admin.findById(user._id).select("-password", "-refreshToken");

  // this will not allow to edit the RT and AC token from the frontend.
  const options = {
    httpOnly:true,
    secure:true
  }

  // sending the response admin logged in successfully.
  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(200,{
      user:loggedInUder,accessToken,refreshToken,
      message:"Admin Logged in successfully."
    })
  );
})

export { registerAdmin,loginAdmin }  