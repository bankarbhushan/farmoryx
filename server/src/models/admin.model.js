import mongoose from "mongoose";
import validator from "validator";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      lowercase: true,
      minLength: [2, "Name should be greater than 2 characters."],
      maxLength: [100, "You reached the name limit."],
      index:true // this is allow tot the search.
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
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
