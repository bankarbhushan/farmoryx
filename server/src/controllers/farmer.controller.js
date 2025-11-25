import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Farmer } from "../models/farmer.model.js";


// CREATE FARMER
const createfarmer = asyncHandler(async (req, res) => {
  const { name, mobile, village } = req.body;

  try {
    if (!name || !mobile || !village) {
      throw new ApiError(400, "All fields are required.");
    }

    let isExistingFarmer = await Farmer.findOne({ mobile });
    if (isExistingFarmer) {
      throw new ApiError(409, "This farmer already exists.");
    }

    const farmer = await Farmer.create({ name, mobile, village });

    return res
      .status(201)
      .json(new ApiResponse(201, farmer, "Farmer created successfully."));
  } catch (error) {
    //  HANDLE MONGOOSE VALIDATION ERRORS
    if (error.name === "ValidationError") {
      const validationMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message: validationMessage,
      });
    }

    // OTHER ERRORS
    return res
      .status(error.statusCode || 500)
      .json({
        success: false,
        message: error.message || "Something went wrong.",
      });
  }
});

// GET ALL FARMERS
const feedfarmer = asyncHandler(async (req, res) => {
  const farmers = await Farmer.find();

  if (!farmers.length) {
    throw new ApiError(404, "No farmers found.");
  }

  return res.status(200).json(
    new ApiResponse(200, farmers, "All farmers fetched successfully.")
  );
});

// UPDATE FARMER
const updatefarmer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, village, mobile } = req.body;

  if (!name || !mobile || !village) {
    throw new ApiError(400, "All fields are required.");
  }

  const farmer = await Farmer.findById(id);
  if (!farmer) {
    throw new ApiError(404, "Farmer not found.");
  }

  const updated = await Farmer.findByIdAndUpdate(
    id,
    { name, village, mobile },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, updated, "Farmer updated successfully.")
  );
});

// DELETE FARMER

const deletefarmer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingFarmer = await Farmer.findById(id);

  if (!existingFarmer) {
    throw new ApiError(404, "Farmer not found.");
  }

  const deletedFarmer = await Farmer.findByIdAndDelete(id);

  return res.status(200).json(
    new ApiResponse(200, deletedFarmer, "Farmer deleted successfully.")
  );
});

export { createfarmer, feedfarmer, updatefarmer,deletefarmer };
