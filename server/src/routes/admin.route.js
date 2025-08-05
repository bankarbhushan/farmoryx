import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  updateAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/reg", createAdmin);
router.get("/adminfeed", getAllAdmin);
router.delete("/deleteadmin/:id", deleteAdmin);
router.patch("/updateadmin/:id", updateAdmin);

export default router;
