import mongoose ,{Schema} from "mongoose";
import validator from "validator";

const brokerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required."],
      lowercase: true,
      minLength: [2, "Name Shloud be greater then 2 charecter."],
      maxLength: [100, "You reach the name limit."],
      index:true
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      unique: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "en-IN"),
        message: "Please enter a valid Indian mobile number.",
      },
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
      select: false, // Don’t expose password in queries
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message:
          "Password must be at least 8 characters, include upper & lowercase letters, a number, and a special character.",
      },
    },

    businessName: {
      type: String,
      required: [true, "Business name is required."],
      trim: true,
    },

    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true },
    },

    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/9618/9618183.png",
      validate: {
        validator: (url) => validator.isURL(url),
        message: "Photo must be a valid URL.",
      },
    },

    role: {
      type: String,
      enum: ["broker"],
      default: "broker",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
    },

    refreshToken :{
      type:String,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true } // this will give you created at and updated at.
);

export const Broker = mongoose.model("Broker", brokerSchema);

