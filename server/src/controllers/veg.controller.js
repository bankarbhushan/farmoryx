import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Vegetable } from "../models/veg.model.js";

// CREATE VEGETABLE
export const createVeg = asyncHandler(async (req, res) => {
    try {
        let { marathiName, hinglishName, englishName } = req.body;

        // Trim values
        marathiName = marathiName?.trim();
        hinglishName = hinglishName?.trim();
        englishName = englishName?.trim();

        // Validation
        if (!marathiName || !hinglishName || !englishName) {
            throw new ApiError(400, "All fields are required.");
        }

        // Duplicate check (Optional but recommended)
        const exists = await Vegetable.findOne({ englishName });
        if (exists) {
            throw new ApiError(409, "This vegetable already exists.");
        }

        // Create Vegetable
        const veg = await Vegetable.create({
            marathiName,
            hinglishName,
            englishName,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, veg, "Vegetable added successfully."));
    }catch (error) {
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

// READ ALL VEGETABLES
export const getAllVeg = asyncHandler(async (req, res) => {
    try {
        const vegs = await Vegetable.find().sort({ createdAt: -1 });

        if (!vegs.length) {
            throw new ApiError(404, "No vegetables found.");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, vegs, "Vegetable list fetched successfully."));
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

// UPDATE VEGETABLE
export const updateVeg = asyncHandler(async (req, res) => {
    try {
    const { id } = req.params;

    const veg = await Vegetable.findById(id);
    if (!veg) throw new ApiError(404, "Vegetable not found.");

    let { marathiName, hinglishName, englishName } = req.body;

    // Trim values
    marathiName = marathiName?.trim();
    hinglishName = hinglishName?.trim();
    englishName = englishName?.trim();

    if (!marathiName || !hinglishName || !englishName) {
        throw new ApiError(400, "All fields are required.");
    }

    const updated = await Vegetable.findByIdAndUpdate(
        id,
        { marathiName, hinglishName, englishName },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Vegetable updated successfully."));
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

// DELETE VEGETABLE
export const deleteVeg = asyncHandler(async (req, res) => {
    try {
    const { id } = req.params;

    const deleted = await Vegetable.findByIdAndDelete(id);

    if (!deleted) throw new ApiError(404, "Vegetable not found.");

    return res
        .status(200)
        .json(new ApiResponse(200, deleted, "Vegetable deleted successfully."));
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
