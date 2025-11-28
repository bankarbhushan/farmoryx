import express from 'express'
import {
  createMerchant,
  feedMerchant,
  updateMerchant,
  deleteMerchant,
} from '../controllers/merchant.controller.js'

const router = express.Router()

router.post('/reg', createMerchant)
router.get('/feed', feedMerchant)
router.patch('/update/:id', updateMerchant)
router.delete('/delete/:id', deleteMerchant)

export {router as merchantRouter}
