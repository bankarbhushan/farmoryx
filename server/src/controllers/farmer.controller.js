// import mongoose from "mongoose";
// import farmerModel from "../models/farmer.model.js";

// // Create Farmer
// export const createFarmer = async (req, res) => {
//   try {
//     const { name, phone, address } = req.body;

//     const existing = await farmerModel.findOne({ name });

//     if (existing) {
//       return res.status(400).json({ message: `${name} already registered.` });
//     }

//     const newFarmer = await farmerModel.create({ name, phone, address });

//     res.status(201).json({
//       message: `Farmer ${newFarmer.name} created successfully.`,
//       data: newFarmer,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Get All Farmers
// export const getAllFarmer = async (req, res) => {
//   try {
//     const feed = await farmerModel.find();

//     if (feed.length > 0) {
//       return res.status(200).json({ data: feed });
//     } else {
//       return res.status(404).json({ message: `No farmers found.` });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Unable to fetch farmers`, error: error.message });
//   }
// };

// // Update Farmer
// export const updateFarmer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, phone, address } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: `Invalid Farmer ID` });
//     }

//     const foundFarmer = await farmerModel.findById(id);

//     if (!foundFarmer) {
//       return res.status(404).json({ message: `Farmer not found.` });
//     }

//     if (name) foundFarmer.name = name;
//     if (phone) foundFarmer.phone = phone;
//     if (address) foundFarmer.address = address;

//     await foundFarmer.save();

//     res.status(200).json({
//       message: `Farmer updated successfully.`,
//       data: foundFarmer,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// // Delete Farmer
// export const deleteFarmer = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const farmer = await farmerModel.findById(id);
//     if (!farmer) {
//       return res.status(404).json({ message: `Farmer not found` });
//     }

//     await farmerModel.findByIdAndDelete(id);

//     res
//       .status(200)
//       .json({ message: `Farmer ${farmer.name} deleted successfully` });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
