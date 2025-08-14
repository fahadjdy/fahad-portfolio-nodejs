const router = require("express").Router();
const ExperienceController = require("../controllers/ExperienceController");

router.get("/", ExperienceController.getExperience);
router.post("/add", ExperienceController.addExperience);
router.put("/edit/:id", ExperienceController.editExperience);
router.delete("/delete/:id", ExperienceController.deleteExperience);
module.exports = router;
