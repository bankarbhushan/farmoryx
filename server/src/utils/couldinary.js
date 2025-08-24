import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.COUDINARY_COULD_NAME, 
  api_key: process.env.COUDINARY_COULD_API_KEY, 
  api_secret: process.env.COUDINARY_COULD_API_SECRET
});

const uploadOnCloudinary = async (localfilepath) =>{
  try {
    if(!localfilepath) return null;
    const response = await cloudinary.uploader.upload(localfilepath,{resource_type:"auto" });
    console.log("file is uploaded on cloudinary.",response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath);
    return null;
  }

}
// the file will store at the local as well as on the server.
// we will provide the local file path using the fs model. 
// resource type basically analysis the file extention.
// fs.unlinkSync this will remove the coropted file, which is failed to upload. 

export {uploadOnCloudinary} 