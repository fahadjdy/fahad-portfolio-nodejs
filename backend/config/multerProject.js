// config/multerProjects.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define folder path
const uploadFolder = path.join(__dirname, "../public/assets/projects/");

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
    const timestamp = Date.now();
    const safeOriginalName = file.originalname.replace(/\s+/g, "_"); // remove spaces
    cb(null, `Project_${timestamp}_${safeOriginalName}`);
  }
});

// Filter for image files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Init multer
const uploadProject = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2 MB per file
});

module.exports = uploadProject;
