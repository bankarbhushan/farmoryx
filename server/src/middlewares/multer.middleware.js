import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public/temp"));
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, "_"); // replace spaces
    cb(null, Date.now() + "_" + safeName);
  }
});

export const upload = multer({ storage });


// this middleware will allow you to store you iimage local
// for while after that we will upload the image to the cloudinary server.