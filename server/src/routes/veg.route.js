import express from "express";
import { createVeg, getAllVeg, updateVeg, deleteVeg } from "../controllers/veg.controller.js";

const router = express.Router();

router.post("/add", createVeg);
router.get("/feed", getAllVeg);
router.patch("/update/:id", updateVeg);
router.delete("/delete/:id", deleteVeg);

export { router as vegRouter };
