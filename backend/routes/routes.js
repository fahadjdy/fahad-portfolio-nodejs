const router = require("express").Router();
const ProfileController = require("../controllers/ProfileController");
const EducationController = require("../controllers/EducationController");
const ExperienceController = require("../controllers/ExperienceController");
const SkillsController = require("../controllers/SkillsController");
const uploadProfile = require('../config/multerProfile');


router.get("/profile",   (req, res) => {
  ProfileController.getProfile(req, res);
});

// must authenticate user before allowing profile edit
router.put("/profile/edit/:id", uploadProfile.single('image'), (req, res) => {
  ProfileController.editProfile(req, res);
});

router.get("/educations",   (req, res) => {
  EducationController.getEducations(req, res);
});

router.get("/experience",   (req, res) => {
  ExperienceController.getExperience(req, res);
});

router.get("/skills",   (req, res) => {
  SkillsController.getSkills(req, res);
});


// router.post('/create', uploadProfile.single('profileImage'), ProfileController.createUser);
// router.put('/update/:id', uploadProfile.single('profileImage'), ProfileController.updateUser);
// router.delete('/delete/:id', ProfileController.deleteUser);
module.exports = router;
