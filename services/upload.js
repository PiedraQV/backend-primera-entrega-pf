import multer from 'multer';
import {__dirname} from '../utils.js'

const storage = multer.diskStorage({
  destination: __dirname + "/public/images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(JSON.stringify({
        status: "error",
        message:
          "El formato no es compatible, sube una imagen tipo: jpg, jpeg, png y/o gif",
        payload: null,
      }));
    }
    cb(null, true);
  },
});

export default upload;