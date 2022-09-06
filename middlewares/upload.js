const path = require('path');
const multer = require('multer');
const { fileMaxSize } = require('../share/variables');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { filesize: fileMaxSize },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
