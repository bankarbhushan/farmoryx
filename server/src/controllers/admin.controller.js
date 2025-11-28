import mongoose from 'mongoose'
import {ApiError} from '../utils/ApiError.js'
import {Admin} from '../models/admin.model.js'
import {uploadOnCloudinary} from '../utils/couldinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

import {asyncHandler} from '../utils/asyncHandler.js'

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await Admin.findById(userId)
    const accessToken = user.generateAccessToken(user)
    const refreshToken = user.generateRefreashToken(user)

    // saving the token in the database
    user.refreashToken = refreshToken

    // no need to check the password valid just save the user.
    await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}
  } catch (error) {
    throw new ApiError(500, 'Unable to generate the access and refresh token.')
  }
}

const registerAdmin = asyncHandler(async (req, res) => {
  const {name, email, password, mobile, role} = req.body.admin

  if ([name, email, password, role, mobile].some((fields) => fields?.trim() === '')) {
    throw new ApiError(400, 'All fields are required.')
  }
  // for every input we will check the empty value if exist then
  // it will give true then we show the error

  const existingAdmin = await Admin.findOne({email})
  if (existingAdmin) throw new ApiError(409, 'This email Alredy Exits')

  const admin = await Admin.create({
    name: name,
    email,
    password,
    mobile,
    role,
  })

  const createdAdmin = await Admin.findById(admin._id).select('-password -refreashToken')

  if (!createdAdmin) throw new ApiError(500, 'Something wents wrong while creating Admin')

  return res
    .status(201)
    .json(new ApiResponse(201, createdAdmin, 'Admin Created Successfully.'))

  // first show the api response when save then it will show the 200
})

const loginAdmin = asyncHandler(async (req, res) => {
  const {email, mobile, password} = req.body

  if (!email || !mobile) throw new ApiError(400, 'All fields are required')

  const user = await Admin.findOne({$or: [{email}, {mobile}]})

  if (!user) throw new ApiError(401, 'User does not exit.')

  const validatePassword = isPasswordCorrect(password)
  if (!validatePassword) throw new ApiError(401, 'Invalid credential')

  // using this we will get the user refresh token and acces token.
  const {refreshToken, accessToken} = await generateAccessTokenAndRefreshToken(user._id)

  // using select method we can define what we dont need to send to the user
  const loggedInUder = Admin.findById(user._id).select('-password', '-refreshToken')

  // this will not allow to edit the RT and AC token from the frontend.
  const options = {
    httpOnly: true,
    secure: true,
  }

  // sending the response admin logged in successfully.
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUder,
        accessToken,
        refreshToken,
        message: 'Admin Logged in successfully.',
      }),
    )
})

export {registerAdmin, loginAdmin}
