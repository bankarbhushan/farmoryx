import express from 'express'
import { createfarmer ,deletefarmer,feedfarmer, updatefarmer } from '../controllers/farmer.controller.js';
const router = express.Router();

router.post("/reg",createfarmer);
router.get("/feed",feedfarmer);
router.patch("/update/:id",updatefarmer);
router.delete("/delete/:id",deletefarmer);

export {router as farmerRouter }
