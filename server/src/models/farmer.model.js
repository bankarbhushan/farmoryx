import mongoose from "mongoose";
import validator from "validator";

const farmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Farmer name is required."],
      trim: true,
      minlength: 3,
      lowercase: true,
      minLength: [2, "Name Shloud be greater then 2 charecter."],
      maxLength: [100, "You reach the name limit."],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required."],
      validate: {
        validator: (value) => validator.isMobilePhone(value, "en-IN"),
        message: "Invalid mobile number.",
      },
    },

    address: {
      village: String,
      taluka: String,
      district: String,
      state: String,
      pincode: String,
    },

    totalSuppliedAmount: {
      type: Number,
      default: 0,
    },

    totalPaymentPending: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
