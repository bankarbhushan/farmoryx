// import mongoose from "mongoose";
// import brokerModel from "../models/broker.model.js";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { Broker } from "../models/broker.model";
import { ApiResponse } from "../utils/ApiResponse";

// export const createBroker = async (req, res) => {
//   try {
//     const { name, email, password, phone, businessName, address } = req.body;

//     const existing = await brokerModel.findOne({ email });

//     if (existing) {
//       return res.status(400).json({ message: "Email already registered." });
//     }

//     const newBroker = await brokerModel.create({
//       name,
//       email,
//       password,
//       phone,
//       businessName,
//       address,
//     });

//     res.status(201).json({
//       message: `New Broker ${newBroker.name} created successfully.`,
//       data: newBroker,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const getAllBroker = async (req, res) => {
//   try {
//     const feed = await brokerModel.find();

//     if (feed.length > 0) {
//       return res.status(200).json({ data: feed });
//     } else {
//       return res.status(404).json({ message: `No Broker found.` });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Unable to fetch Broker`, error: error.message });
//   }
// };

// export const updateBroker = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { email, role, name, phone, businessName, password } = req.body;

//     if (email || role) {
//       return res
//         .status(403)
//         .json({ message: "Email or role update not allowed." });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: `Invalid Broker ID` });
//     }

//     const foundBroker = await brokerModel.findById(id);

//     if (!foundBroker) {
//       return res.status(404).json({ message: `Broker not found.` });
//     }

//     if (name) foundBroker.name = name;
//     if (businessName) foundBroker.businessName = businessName;
//     if (password) foundBroker.password = password;
//     if (phone) foundBroker.phone = phone;

//     await foundBroker.save();

//     res.status(200).json({
//       message: `Broker updated successfully.`,
//       data: foundBroker,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// export const deleteBroker = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const broker = await brokerModel.findById(id);

//     const foundBroker = await brokerModel.findByIdAndDelete(id);

//     if (!foundBroker) {
//       return res.status(404).json({ message: `Broker not found` });
//     }
//     res.status(200).json({ message: `${broker.name} deleted successfully` });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


const generateAccessTokenRefreshToken = async (userId)=>{
    try{
        const user = await Broker.findById(userId);
        if(!user) throw ApiError(401,"user does not exist.")
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken}
    }
    catch(error){
        throw new ApiError(500,"Unable to generate the access and refresh token.")
    }
}

const registerBroker = asyncHandler(async (req,res)=>{
    const {role, name, email,address, password,businessName,mobile} = req.body.borker;

    if([name, email,password,role,mobile].some((fields)=>fields?.trim() === "")){
        throw new ApiError(400,"All fileds required.")
    }
    
    const existingBroker = await Broker.findOne({email})

    if(existingBroker) throw new ApiError(409,"This Email already exist.");

    const broker = await Broker.create({
        name,
        email,
        password,
        mobile,
        role,
        businessName
    });

    const createBroker = await Broker.findById(broker._id).select("-password -refreshToken");

    if(!createBroker) throw new ApiError(500,"something went Wrong");

    return res
    .status(201)
    .json(new ApiResponse(201,createBroker, "Broker Create Succsessfully."))
})

const loginBroker = asyncHandler(async (req,res)=>{

    const {email,password,mobile} = req.body.broker;

    if([(email || mobile)].some((fields)=>fields.trim === "")) throw new ApiError(400,"All fields are required.");

    const broker = await Broker.findOne({ $or :[{email},{mobile}]});

    if(!existBroker) throw new ApiError(401,"Broker does not exist.");
    
    const validatePassword = Broker.isPasswordCorrect(password);

    if(!validatePassword) throw new ApiError(401,"Invalid Password.");

    const {refreshToken, accessToken} = await generateAccessTokenRefreshToken(broker._id);

    const loggedInUser = Broker.findById(user._id).select("-password", "-refreshToken");

    const options ={
        httpOnly:true,
        secure:true
    }
    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshtoken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            user :loggedInUser,accessToken,refreshToken,
            message:"Broker Logged in successfully."
        })
    )
});

export {registerBroker,loginBroker}