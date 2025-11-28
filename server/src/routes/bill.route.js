import express from 'express'
import {
  allbills,
  createBill,
  deleteBill,
  feedbill,
  SingleBill,
} from '../controllers/bill.controller.js'

const router = express.Router()

router.route('/create').post(createBill)
router.route('/feed').get(feedbill)
router.route('/allbills').get(allbills)
router.route('/delete/:id').delete(deleteBill)
router.route('/singlebill/:id').get(SingleBill)

export {router as billRouter}
