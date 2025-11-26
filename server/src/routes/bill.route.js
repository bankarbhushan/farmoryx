import express from "express"
import { createBill, deleteBill, feedbill } from "../controllers/bill.controller.js";

const router = express.Router();

router.route("/create").post(createBill);
router.route("/feed").get(feedbill);
router.route("/delete/:id").delete(deleteBill);

export  {router as billRouter};