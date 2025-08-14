const router = require("express").Router();
const SkillsController = require("../controllers/SkillsController");

// Get all skills
router.get("/", SkillsController.getSkills);

// Add a new skill
router.post("/add", SkillsController.addSkill);

// Edit an existing skill
router.put("/edit/:id", SkillsController.editSkill);

// Delete a skill
router.delete("/delete/:id", SkillsController.deleteSkill);

module.exports = router;
