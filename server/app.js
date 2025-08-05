import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({limit:"16kb"}))
// this will allow only the json what ever data come from the response.
// the data should be in the 16kb formate

app.use(express.urlencoded({entended:true,limit:"16kb"}))
// this wil allow the object inside object 

app.use(express.static("public"))
// this will allow to store the static things like imgae,


app.use(cookieParser())

export {app}