import multer from "multer";

const DESTINATION_PATH = "/Projects/SOCIALMEDIAFEEDS/node-runtime/assets";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DESTINATION_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export { upload };
