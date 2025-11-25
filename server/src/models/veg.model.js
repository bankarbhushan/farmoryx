import mongoose ,{Schema} from "mongoose";

const vegSchema = new Schema(
  {
     englishName : {
      type: String,
      trim: true,
      index:true
    },
    hinglishName: {
      type: String,
      required: [true, "Hinglish name is required"],
      trim: true,
      index:true
    },
    marathiName: {
      type: String,
      trim: true,
      required: [true, "Marathi name is required"],
      index:true
    },
  },
  { timestamps: true }
);

export const Vegetable = mongoose.model("Veg", vegSchema);

