import express from "express";
import {
  createMerchant,
  deleteMerchant,
  getAllMerchants,
  updateMerchant,
} from "../controllers/merchant.controller.js";

const router = express.Router();

router.post("/reg", createMerchant);
router.get("/merchantfeed", getAllMerchants);
router.delete("/deletemerchant/:id", deleteMerchant);
router.patch("/updatemerchant/:id", updateMerchant);

export default router;
