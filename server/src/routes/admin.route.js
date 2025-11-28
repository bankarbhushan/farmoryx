// import express from "express";
// import {
//   createAdmin,
//   deleteAdmin,
//   getAllAdmin,
//   updateAdmin,
// } from "../controllers/admin.controller.js";

// const adminRouter = express.Router();

// router.post("/regitration", createAdmin);
// // router.get("/adminfeed", getAllAdmin);
// // router.delete("/deleteadmin/:id", deleteAdmin);
// // router.patch("/updateadmin/:id", updateAdmin);

// export {adminRouter};

// import { Router } from "express";
// import { registerAdmin } from "../controllers/admin.controller.js";
// const router = Router()

// router.route("/register").post(registerAdmin);

// export default router;

import express from 'express'
import {registerAdmin} from '../controllers/admin.controller.js'
import {upload} from '../middlewares/multer.middleware.js'

const router = express.Router()

// POST => /api/v1/admin/register
// router.route("/register").post(upload.single({name:"avatar"}),registerAdmin)
// router.route("/register").post(upload.single("avatar"), registerAdmin);
// router.route("/register").post(upload.array("avatars", 5), registerAdmin);

router.route('/register').post(
  upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'documents', maxCount: 5},
  ]),
  registerAdmin,
)

export {router as adminRouter}
