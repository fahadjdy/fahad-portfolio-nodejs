const router = require("express").Router();
const SkillsController = require("../controllers/SkillsController");
const { authenticate } = require("../middlewares/auth");

// Get all skills
router.get("/", SkillsController.getSkills);


// ================ Authenticated user only ==================================
router.use(authenticate);

router.post("/add", SkillsController.addSkill);
router.put("/edit/:id", SkillsController.editSkill);
router.delete("/delete/:id", SkillsController.deleteSkill);

module.exports = router;
