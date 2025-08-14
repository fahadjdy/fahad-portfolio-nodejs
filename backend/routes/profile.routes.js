// routes/profile.routes.js
const router = require("express").Router();
const ProfileController = require("../controllers/ProfileController");
const uploadProfile = require("../config/multerProfile");
const { authenticate } = require("../middlewares/auth");


router.get("/", ProfileController.getProfile);

// ================ Authenticated user only ==================================
router.use(authenticate);

router.put("/edit/:id", uploadProfile.single("image"), ProfileController.editProfile);

module.exports = router;
