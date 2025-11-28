import mongoose, {Schema} from 'mongoose'

const productItemSchema = new Schema({
  productName: {type: String, required: true},
  weight: {type: Number, required: true},
  rate: {type: Number, required: true},
  productItemTotal: {type: Number, required: true},
})

const billSchema = new Schema(
  {
    userType: {
      type: String,
      enum: ['farmer', 'merchant'],
      required: true,
    },
    userName: String,
    userMobile: String,
    brokerId: {
      type: String,
      ref: 'Broker',
      required: [true, 'Broker id is required.'],
    },
    billDate: {
      type: String,
      required: true,
    },
    weekday: {
      type: String,
      required: true,
    },
    items: [productItemSchema],
    totalAmount: Number,
    commissionAmount: Number,
    pattiCharges: Number,
    advancePaid: Number,
    externalVegCost: Number,
    netTotal: Number,
    isBillGenerated: {
      type: Boolean,
      default: false,
    },
    isSharedToWhatsApp: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true},
)

export const Bill = mongoose.model('Bill', billSchema)
