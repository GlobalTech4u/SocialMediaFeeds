import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __uploads = path.join(__dirname, "../../uploads");
const DESTINATION_PATH = "uploads/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __uploads);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export { upload };
