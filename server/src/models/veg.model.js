import mongoose from "mongoose";

const vegSchema = new mongoose.Schema(
  {
    nameEnglish: {
      type: String,
      trim: true,
    },
    nameHinglish: {
      type: String,
      required: [true, "Hinglish name is required"],
      trim: true,
    },
    nameMarathi: {
      type: String,
      trim: true,
      required: [true, "Marathi name is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Veg", vegSchema);
