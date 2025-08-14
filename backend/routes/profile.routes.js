// routes/profile.routes.js
const router = require("express").Router();
const ProfileController = require("../controllers/ProfileController");
const uploadProfile = require("../config/multerProfile");
const { authenticate } = require("../middlewares/auth");

router.use(authenticate);

router.get("/", ProfileController.getProfile);
router.put("/edit/:id", uploadProfile.single("image"), ProfileController.editProfile);

module.exports = router;
