// import mongoose ,{Schema} from "mongoose";
// import validator from "validator";

// const merchantSchema = new Schema(
//   {
//     // brokerId: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "Broker",
//     //   required: true,
//     // },
//     name: {
//       type: String,
//       required: [true, "Merchant name is required"],
//       trim: true,
//       minlength: 3,
//       lowercase: true,
//       minLength: [2, "Name Shloud be greater then 2 charecter."],
//       maxLength: [100, "You reach the name limit."],
//       index:true
//     },
//     phone: {
//       type: String,
//       required: [true, "Phone is required"],
//       validate: {
//         validator: (value) => validator.isMobilePhone(value, "en-IN"),
//         message: "Invalid phone number",
//       },
//     },
//     address: {
//       shopName: String,
//       area: String,
//       city: String,
//       pincode: String,
//     },
//     businessType: {
//       type: String,
//       enum: ["hotel", "local-shop", "wholesaler", "retail", "other"],
//       default: "retail",
//     },
//     totalPurchasedAmount: {
//       type: Number,
//       default: 0,
//     },
//     totalPaymentPending: {
//       type: Number,
//       default: 0,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// export const Merchant=  mongoose.model("Merchant", merchantSchema);
