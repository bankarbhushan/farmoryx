import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      ref: "Farmer",
      required: true,
    },
    nameMarathi: {
      type: mongoose.Schema.Types.String,
      ref: "Veg",
      required: true,
    },
    rate: {
      type: Number,
    },
    Weight: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
