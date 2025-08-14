// routes/profile.routes.js
const router = require("express").Router();
const ProfileController = require("../controllers/ProfileController");
const uploadProfile = require("../config/multerProfile");

// Get profile details
router.get("/", ProfileController.getProfile);

// Update existing profile
router.put("/edit/:id", uploadProfile.single("image"), ProfileController.editProfile);

module.exports = router;
