// import itemModel from "../models/item.model.js";

// export const createItem = async (req, res) => {
//   try {
//     const { name, nameMarathi, rate, Weight, total } = req.body;

//     const newItem = await itemModel.create({
//       name,
//       nameMarathi,
//       rate,
//       Weight,
//       total,
//     });

//     res.status(201).json({
//       message: `${nameMarathi} added successfully`,
//       data: newItem,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const getAllItem = async (req, res) => {
//   try {
//     const feed = await itemModel.find();

//     if (feed.length > 0) {
//       return res
//         .status(200)
//         .json({ data: feed, message: "All item  featch Succussfully." });
//     } else {
//       return res.status(404).json({ message: "No Item found" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// export const updateItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nameMarathi, rate, Weight, total } = req.body;

//     const item = await itemModel.findById(id);

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     if (rate) item.rate = rate;
//     if (Weight) item.Weight = Weight;
//     if (total) item.total = total;
//     if (nameMarathi) item.nameMarathi = nameMarathi;

//     await item.save();

//     res.status(200).json({
//       message: "Item updated successfully",
//       data: item,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// export const deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const item = await itemModel.findById(id);

//     const foundItem = await itemModel.findByIdAndDelete(id);

//     if (!foundItem) {
//       return res.status(404).json({ message: ` Item not found` });
//     }
//     res
//       .status(200)
//       .json({ message: `${item.nameMarathi} deleted successfully` });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
