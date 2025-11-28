import { Bill } from "../models/bill.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBill = asyncHandler(async (req, res) => {
  const { generalInfo, products, calculation } = req.body.bill;

  if (!generalInfo || !products || !calculation) {
    throw new ApiError(400, "Invalid bill format.");
  }
  const {
    userType,
    broker_id: brokerId,
    billDate,
    weekday,
    userName,
    userMobile,
    pattiCharges,
    advancePaid,
    externalVegCost
  } = generalInfo;

  // Extract calculation
  const {
    totalAmount,
    commissionAmount,
    netTotal
  } = calculation;

  // Validation
  console.log(userType,brokerId,billDate,weekday)
  
  if (!userType  || !brokerId || !billDate || !weekday) {
    throw new ApiError(400, "Missing required fields.");
  }

  if (!products || products.length === 0) {
    throw new ApiError(400, "Products cannot be empty.");
  }

  // Prepare items array with productItemTotal
  const items = products.map(item => ({
    productName: item.productName,
    weight: Number(item.weight),
    rate: Number(item.rate),
    productItemTotal: Number(item.weight) * Number(item.rate)
  }));

  // Create bill
  const bill = await Bill.create({
    userType,
    brokerId,
    billDate,
    weekday,
    userName,
    userMobile,
    items,
    totalAmount,
    commissionAmount,
    pattiCharges,
    advancePaid,
    externalVegCost,
    netTotal,
    isBillGenerated: true
  });
    return res.status(201).json(
    new ApiResponse(201, { bill }, "Bill Generated Successfully.")
  );
});

// GET ALL FARMERS
const feedbill = asyncHandler(async (req, res) => {
  try {
  const { type } = req.query; // farmer / merchant

  if (!type) {
    throw new ApiError(400, "Bill type is required (farmer/merchant).");
  }

  const bills = await Bill.find({ userType: type }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, bills, "Bill list fetched successfully."));
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

const allbills = asyncHandler(async (req, res) => {
  try {

  const bills = await Bill.find();

    if (!bills.length) {
      throw new ApiError(404, "No Bill found.");
    }
  return res
    .status(200)
    .json(new ApiResponse(200, bills, "Bill fetched successfully."));
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

// DELETE BILL
const deleteBill = asyncHandler(async(req,res)=>{
  try {
    const {id} = req.params;

    const existingBill = await Bill.findById(id);

    if(!existingBill){
      throw new ApiError(404,"Bill not Found.")
    }

    const deleteBill = await Bill.findByIdAndDelete(id);

    return res.status(200).json(
      new ApiResponse(200,deleteBill,"Bill Deleted Successfully.")
    );
  } catch (error) {
     if (error.name === "ValidationError") {
      const validationMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message: validationMessage,
      });
    }
    return res
    .status(error.statusCode || 500)
    .json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
  
})

const SingleBill = asyncHandler(async(req,res)=>{
  try {
    const {id} = req.params;

    const existingBill = await Bill.findById(id);

    if(!existingBill){
      throw new ApiError(404,"Bill not Found.")
    }

    return res.status(200).json(
      new ApiResponse(200,existingBill,"Sigle bill data fetach Successfully.")
    );
  } catch (error) {
     if (error.name === "ValidationError") {
      const validationMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");

      return res.status(400).json({
        success: false,
        message: validationMessage,
      });
    }
    return res
    .status(error.statusCode || 500)
    .json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
  
})


export { createBill ,feedbill,deleteBill,SingleBill,allbills};

