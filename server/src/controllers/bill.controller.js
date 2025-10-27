// import billModel from "../models/bill.model.js";
// import farmerModel from "../models/farmer.model.js";
// export const createBill = async (req, res) => {
//   try {
//     const {
//       farmerId,
//       merchantId,
//       brokerId,
//       supplyDate,
//       items,
//       subtotal,
//       commissionAmount,
//       pattiCharges,
//       advancePaid,
//       externalVegCost,
//       netTotal,
//       paymentStatus,
//       billNumber,
//       isBillGenerated,
//     } = req.body;

//     const farmer = await farmerModel.findById(farmerId);

//     console.log("farmer :>> ", farmer);

//     const existing = await billModel.findOne({ billNumber });

//     if (existing) {
//       return res
//         .status(400)
//         .json({ message: "This product Item already exist" });
//     }

//     const newProductItem = await billModel.create({
//       farmerId,
//       merchantId,
//       brokerId,
//       supplyDate,
//       items,
//       subtotal,
//       commissionAmount,
//       pattiCharges,
//       advancePaid,
//       externalVegCost,
//       netTotal,
//       paymentStatus,
//       billNumber,
//       isBillGenerated,
//     });

//     res.status(201).json({
//       message: `${billNumber} created successfully`,
//       data: newProductItem,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const getAllBill = async (req, res) => {
//   try {
//     const feed = await billModel.find();

//     if (feed.length > 0) {
//       return res
//         .status(200)
//         .json({ data: feed, message: "All prodcut Item featch Succussfully." });
//     } else {
//       return res.status(404).json({ message: "No product found" });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// export const updateBill = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid Product Item ID" });
//     }

//     const productItem = await billModel.findById(id);

//     if (!productItem) {
//       return res.status(404).json({ message: "Product Item not found" });
//     }

//     // Dynamically update fields from request body
//     Object.keys(req.body).forEach((key) => {
//       productItem[key] = req.body[key];
//     });

//     await productItem.save();

//     res.status(200).json({
//       message: "Product Item updated successfully",
//       data: productItem,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// export const deleteBill = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await billModel.findById(id);

//     const foundProduct = await billModel.findByIdAndDelete(id);

//     if (!foundProduct) {
//       return res.status(404).json({ message: `Product not found` });
//     }
//     res.status(200).json({ message: `${product.name} deleted successfully` });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

import { Bill } from "../models/bill.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBill = asyncHandler(async (req, res) => {
  const {
    farmerId,
    brokerId,
    Date,
    items,
    subtotal,
    commissionAmount,
    pattiCharges,
    advancePaid,
    externalVegCost,
    billNumber,
    netTotal
  } = req.body;

  if (
    [
      farmerId,
      brokerId,
      Date,
      items,
      subtotal,
      commissionAmount,
      pattiCharges,
      advancePaid,
      externalVegCost,
      billNumber,
      netTotal
    ].some(field => field === undefined || field === null || field === "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingBill = await Bill.findOne({ billNumber });
  if (existingBill) throw new ApiError(409, "This bill already exists.");

  const bill = await Bill.create({
    farmerId,
    brokerId,
    Date,
    items,
    subtotal,
    commissionAmount,
    pattiCharges,
    advancePaid,
    externalVegCost,
    billNumber,
    netTotal
  });

  if (!bill) throw new ApiError(500, "Something went wrong while creating the bill.");

  res.status(201).json(
    new ApiResponse(201, { bill }, "Bill Generation Successful.")
  );
});

export { createBill };

