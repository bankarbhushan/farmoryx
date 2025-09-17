import mongoose, { Schema } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      lowercase: true,
      minLength: [2, "Name should be greater than 2 characters."],
      maxLength: [100, "You reached the name limit."],
      index: true // this is allow tot the search im the Database.
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required."],
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please enter a valid email.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value) && !/\s/.test(value),
        // second condition for the space restriction.
        message:
          "Password must be at least 8 characters, include upper & lowercase letters, a number, and a special character, space not allowed",
      },
    },
    mobile: {
      type: Number,
      required: true
    },
    avatar:
    {
      type: String,
      //  required: true 
    },
    documents: [{ type: String }],
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
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
      type: String
    }
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next()
  }
  // when only password change then only run
})

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

adminSchema.methods.generateAccessToken = function () {
  jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email
  },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expriresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

adminSchema.methods.generateRefreashToken = function () {
  jwt.sign({
    _id: this._id,
  },
    process.env.REFREASH_TOKEN_SECRET,
    {
      expriresIn: process.env.REFREASH_TOKEN_EXPIRY
    })
}
export const Admin = mongoose.model("Admin", adminSchema);
