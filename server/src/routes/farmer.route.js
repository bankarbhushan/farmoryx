    // import express from "express";
    // import {
    //   createFarmer,
    //   getAllFarmer,
    //   updateFarmer,
    //   deleteFarmer,
    // } from "../controllers/farmer.controller.js";

    // const router = express.Router();

    // router.post("/reg", createFarmer);
    // router.get("/farmerfeed", getAllFarmer);
    // router.delete("/deletefarmer/:id", deleteFarmer);
    // router.patch("/updatefarmer/:id", updateFarmer);

    // export default router;

    import express from 'express'
    import { createfarmer ,feedfarmer, updatefarmer } from '../controllers/farmer.controller.js';
    const router = express.Router();

    router.post("/reg",createfarmer);
    router.get("/feed",feedfarmer);
    router.patch("/update/:id",updatefarmer);

    export {router as farmerRouter }
