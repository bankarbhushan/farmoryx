// import mongoose from "mongoose";
// import brokerModel from "../models/broker.model.js";

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
