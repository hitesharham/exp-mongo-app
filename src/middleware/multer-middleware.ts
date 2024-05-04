
import multer from 'multer';

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/uploads/'); // Directory where files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename
  }
});

const upload = multer({ storage: storage });

export default upload;
