import mongoose, {Schema} from 'mongoose'
import validator from 'validator'

const farmerSchema = new Schema(
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
        validator: (value) => validator.isMobilePhone(value, 'en-IN'),
        message: 'Invalid mobile number.',
      },
    },

    village: {
      type: String,
      required: true,
    },

    totalSuppliedAmount: {type: Number, default: 0},
    totalPaymentPending: {type: Number, default: 0},
    isActive: {type: Boolean, default: true},
  },
  {timestamps: true},
)

export const Farmer = mongoose.model('Farmer', farmerSchema)
