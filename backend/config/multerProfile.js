const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define folder path
const uploadFolder = path.join(__dirname, '../public/assets/profile/');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check if folder exists, if not create it
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// Optional: Filter for image files only
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  cb(null, isImage);
};

const uploadProfile = multer({ storage, fileFilter });

module.exports = uploadProfile;
