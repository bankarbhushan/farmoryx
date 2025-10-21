// import mongoose ,{Schema} from "mongoose";
// import validator from "validator";

// const brokerSchema = new Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: [true, "Name is required."],
//       lowercase: true,
//       minLength: [2, "Name Shloud be greater then 2 charecter."],
//       maxLength: [100, "You reach the name limit."],
//       index:true
//     },

//     phone: {
//       type: String,
//       required: [true, "Phone number is required."],
//       unique: true,
//       validate: {
//         validator: (value) => validator.isMobilePhone(value, "en-IN"),
//         message: "Please enter a valid Indian mobile number.",
//       },
//     },

//     email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//       unique: true,
//       required: [true, "Email is required."],
//       validate: {
//         validator: (value) => validator.isEmail(value),
//         message: "Please enter a valid email.",
//       },
//     },

//     password: {
//       type: String,
//       required: [true, "Password is required."],
//       select: false, // Don’t expose password in queries
//       validate: {
//         validator: (value) => validator.isStrongPassword(value),
//         message:
//           "Password must be at least 8 characters, include upper & lowercase letters, a number, and a special character.",
//       },
//     },

//     businessName: {
//       type: String,
//       required: [true, "Business name is required."],
//       trim: true,
//     },

//     address: {
//       street: { type: String, trim: true },
//       city: { type: String, trim: true },
//       state: { type: String, trim: true },
//       pincode: { type: String, trim: true },
//     },

//     photoUrl: {
//       type: String,
//       default: "https://cdn-icons-png.flaticon.com/512/9618/9618183.png",
//       validate: {
//         validator: (url) => validator.isURL(url),
//         message: "Photo must be a valid URL.",
//       },
//     },

//     role: {
//       type: String,
//       enum: ["broker"],
//       default: "broker",
//     },

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     lastLoginAt: {
//       type: Date,
//     },

//     refreshToken :{
//       type:String,
//     },
//     resetPasswordToken: {
//       type: String,
//       select: false,
//     },

//     resetPasswordExpires: {
//       type: Date,
//       select: false,
//     },
//   },
//   { timestamps: true } // this will give you created at and updated at.
// );

// export const Broker = mongoose.model("Broker", brokerSchema);

import mongoose ,{Schema} from "mongoose"
import jwt from "jsonwebtoken";

const brokerSchema = new Schema({
    name :{
        type :String,
        required : [true,"Broker name is Required."],
        trim :true,
        lowercase:true,
        minLength:[2,"Name Should be greater than 2 charecter"],
        maxLength:[30,"You reached the name limit."]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        lowercase :true,
        unique:true,
        trim:true,
        validate:{
            validator : (value) => validator.isEmail(value),
            message:"Please enter a valid email."
        }
    },
    password:{
        type:String,
        required:[true,"Password is required."],
        trim :true,
        unique:true,
        select: false,
        validate :{
            validator : (value)=>validator.isStrongPassword(value) && !/\s/.test(value),
            message:"Please Enter a valid Password."
        }
    },
    mobile:{
        type: Number,
        required: true,
        minLength:[10,"You Have to enter Min 10 Digit."],
        maxLength:[10,"You reached the number limit."]
    },
    role:{
        type:String,
        enum:["broker"],
        default:"broker",
        immutable:true
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

import bcrypt from "bcrypt";

brokerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
// before save it check whether the password is modified or changes 
// if change then hash the new password

brokerSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(this.password,password)
}


brokerSchema.methods.generateAccessToken = function () {
    // this is for the sort time 15 min
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
//jwt.sign(payload, secret, options)
brokerSchema.methods.generateRefreshToken = function () {
    // this is for the long time 1 month
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Broker = mongoose.model("Broker",brokerSchema)