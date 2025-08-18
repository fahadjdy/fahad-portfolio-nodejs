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
    // Clean original filename (remove spaces, special chars)
    const originalName = file.originalname.replace(/\s+/g, '_');
    const timestamp = Date.now();

    const customName = `${timestamp}_${originalName}`;
    cb(null, customName);
  }
});

// Optional: Filter for image files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const uploadProfile = multer({ storage, fileFilter });

module.exports = uploadProfile;
