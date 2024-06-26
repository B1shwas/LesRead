import multer, { diskStorage } from "multer";
import path from "path";

const getUploadDestination = (modelName) => {
  return path.resolve(`./public/uploads/${modelName}`);
};

const storage = (modelName) =>
  diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = getUploadDestination(modelName);
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

const upload = (modelName) =>
  multer({
    storage: storage(modelName),
    fileFilter: (req, file, cb) => {
      cb(null, true);
    },
  });

export { upload };
