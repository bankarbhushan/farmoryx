import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {Merchant} from '../models/merchant.model.js'

// CREATE MERCHANT
export const createMerchant = asyncHandler(async (req, res) => {
  try {
    const {name, mobile, village, businessName} = req.body

    if (!name || !mobile || !village || !businessName) {
      throw new ApiError(400, 'All fields are required.')
    }

    const exists = await Merchant.findOne({mobile})
    if (exists) {
      throw new ApiError(409, 'Merchant already exists.')
    }

    const merchant = await Merchant.create({
      name,
      mobile,
      village,
      businessName,
    })

    return res
      .status(201)
      .json(new ApiResponse(201, merchant, 'Merchant created successfully.'))
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ')

      return res.status(400).json({
        success: false,
        message: validationMessage,
      })
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Something went wrong.',
    })
  }
})

// FEED MERCHANT
export const feedMerchant = asyncHandler(async (req, res) => {
  try {
    const merchants = await Merchant.find()

    if (!merchants.length) {
      throw new ApiError(404, 'No merchants found.')
    }

    return res
      .status(200)
      .json(new ApiResponse(200, merchants, 'All merchants fetched successfully.'))
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ')
      return res.status(400).json({success: false, message: validationMessage})
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Something went wrong.',
    })
  }
})

// UPDATE MERCHANT
export const updateMerchant = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params
    const {name, mobile, village, businessName} = req.body

    if (!name || !mobile || !village || !businessName) {
      throw new ApiError(400, 'All fields are required.')
    }

    const merchant = await Merchant.findById(id)
    if (!merchant) {
      throw new ApiError(404, 'Merchant not found.')
    }

    const updated = await Merchant.findByIdAndUpdate(
      id,
      {name, mobile, village, businessName},
      {new: true},
    )

    return res
      .status(200)
      .json(new ApiResponse(200, updated, 'Merchant updated successfully.'))
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ')
      return res.status(400).json({success: false, message: validationMessage})
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Something went wrong.',
    })
  }
})

// DELETE MERCHANT
export const deleteMerchant = asyncHandler(async (req, res) => {
  try {
    const {id} = req.params

    const merchant = await Merchant.findById(id)
    if (!merchant) {
      throw new ApiError(404, 'Merchant not found.')
    }

    const deletedMerchant = await Merchant.findByIdAndDelete(id)

    return res
      .status(200)
      .json(new ApiResponse(200, deletedMerchant, 'Merchant deleted successfully.'))
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationMessage = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ')
      return res.status(400).json({success: false, message: validationMessage})
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Something went wrong.',
    })
  }
})
