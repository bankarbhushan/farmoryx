import mongoose, { Schema } from "mongoose";
import validator from "validator";

const merchantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 2,
      maxlength: 100,
    },

    mobile: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "en-IN"),
        message: "Invalid mobile number.",
      },
    },

    village: {
      type: String,
      required: true
    },

    businessName: {
      type: String,
      required: true,
      trim: true
    },

    totalPurchasedAmount: { type: Number, default: 0 },
    totalPaymentPending: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Merchant = mongoose.model("Merchant", merchantSchema);
