import mongoose from "mongoose";

// Define item schema used in bills
const productItemSchema = new mongoose.Schema({
  name: String,
  rate: Number,
  weight: Number,
  total: Number,
});

const billSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.String,
      ref: "Farmer",
      required: true,
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    brokerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broker",
      required: true,
    },
    supplyDate: {
      type: Date,
      default: Date.now,
    },
    items: [productItemSchema],
    subtotal: { type: Number, required: true },
    commissionAmount: Number,
    pattiCharges: { type: Number, default: 10 },
    advancePaid: { type: Number, default: 0 },
    externalVegCost: { type: Number, default: 0 },
    netTotal: Number,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    billNumber: { type: String, unique: true },
    isBillGenerated: { type: Boolean, default: false },
    pdfUrl: String,
    isSharedToWhatsApp: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);
