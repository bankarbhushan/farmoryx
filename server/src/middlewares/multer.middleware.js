const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage})

// this middleware will allow you to store you iimage local
// for while after that we will upload the image to the cloudinary server.