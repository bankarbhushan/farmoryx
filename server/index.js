import express from 'express'
import dotenv from 'dotenv'
import {app} from './app.js'
import connectDB from './src/db/index.js'

dotenv.config({
  path: './.env',
})

// const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('MongoDB connection failed !!!', err)
  })
