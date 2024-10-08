import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { cloudinary } from "./cloudinary.util.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // const __uploads = path.join(__dirname, "../../uploads");
// const __uploads = path.join(process.cwd(), "uploads");
// const DESTINATION_PATH = "uploads/";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __uploads);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "uploads",
//     public_id: (req, file) => `${Date.now()}-${file.originalname}`,
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export { upload };
