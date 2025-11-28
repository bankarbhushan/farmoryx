import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs'

// dotenv.config({
//   path:"./.env"
// });
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@df2ykl4vc || mycould,
//   api_key: process.env.CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@df2ykl4vc,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) {
      console.log('No file path provided!')
      return null
    }
    console.log('Uploading to Cloudinary:', localfilepath)

    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: 'auto',
    })

    console.log('Cloudinary upload success:', response.secure_url)
    return response
  } catch (error) {
    console.error('Cloudinary upload error:', error.message)
    if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath)
    }
    return null
  }
}

// the file will store at the local as well as on the server.
// we will provide the local file path using the fs model.
// resource type basically analysis the file extention.
// fs.unlinkSync this will remove the coropted file, which is failed to upload.

export {uploadOnCloudinary}
