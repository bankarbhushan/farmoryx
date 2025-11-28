import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'

const brokerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Broker name is Required.'],
      trim: true,
      lowercase: true,
      minLength: [2, 'Name Should be greater than 2 charecter'],
      maxLength: [30, 'You reached the name limit.'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Please enter a valid email.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      trim: true,
      unique: true,
      select: false,
      validate: {
        validator: (value) => validator.isStrongPassword(value) && !/\s/.test(value),
        message: 'Please Enter a valid Password.',
      },
    },
    mobile: {
      type: Number,
      required: true,
      minLength: [10, 'You Have to enter Min 10 Digit.'],
      maxLength: [10, 'You reached the number limit.'],
    },
    address: {
      type: String,
      maxLength: [100, 'You have reached the limit.'],
    },
    businessName: {
      type: String,
      required: [true, 'Business name is Required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['broker'],
      default: 'broker',
      immutable: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
    refreashToken: {
      type: String,
    },
  },
  {timestamps: true},
)

import bcrypt from 'bcrypt'
import {trim} from 'validator'

brokerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})
// before save it check whether the password is modified or changes
// if change then hash the new password

brokerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(this.password, password)
}

brokerSchema.methods.generateAccessToken = function () {
  // this is for the sort time 15 min
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  )
}
//jwt.sign(payload, secret, options)
brokerSchema.methods.generateRefreshToken = function () {
  // this is for the long time 1 month
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  )
}

export const Broker = mongoose.model('Broker', brokerSchema)
