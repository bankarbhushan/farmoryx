import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN || "*",
    credentials:true,
}))

app.use(express.json({limit:"16kb"}))
// this will allow only the json what ever data come from the response.
// the data should be in the 16kb formate

app.use(express.urlencoded({extended:true, limit:"16kb"}))
// this wil allow the object inside object 

app.use(express.static("public"))
// this will allow to store the static things like imgae,

app.use(cookieParser())

// Router inport 
import  {adminRouter}  from "./src/routes/admin.route.js"
import { billRouter } from "./src/routes/bill.route.js"
import { farmerRouter } from "./src/routes/farmer.route.js"
import { vegRouter } from "./src/routes/veg.route.js"
import { merchantRouter } from "./src/routes/merchant.route.js"

// Declering router 
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/bill",billRouter)
app.use("/api/v1/farmer",farmerRouter)
app.use("/api/v1/merchant",merchantRouter)
app.use("/api/v1/veg",vegRouter)
// https://localhost:8080/api/v1/admin/register
// we are defining the api and version 1 it will call to teh adminrouter then 
// this admin router will registerr admin method which is defined in the controller.


export {app}