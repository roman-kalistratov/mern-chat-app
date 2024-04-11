import multer from "multer";

// multer settings
const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

const uploadAvatar = multer({ storage: storageUser });

export default uploadAvatar;
