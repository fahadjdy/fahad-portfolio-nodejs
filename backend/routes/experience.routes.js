const router = require("express").Router();
const ExperienceController = require("../controllers/ExperienceController");
const { authenticate } = require("../middlewares/auth");

router.use(authenticate);

router.get("/", ExperienceController.getExperience);
router.post("/add", ExperienceController.addExperience);
router.put("/edit/:id", ExperienceController.editExperience);
router.delete("/delete/:id", ExperienceController.deleteExperience);
module.exports = router;
