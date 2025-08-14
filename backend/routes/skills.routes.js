const router = require("express").Router();
const SkillsController = require("../controllers/SkillsController");
const { authenticate } = require("../middlewares/auth");


router.use(authenticate);

router.get("/", SkillsController.getSkills);
router.post("/add", SkillsController.addSkill);
router.put("/edit/:id", SkillsController.editSkill);
router.delete("/delete/:id", SkillsController.deleteSkill);

module.exports = router;
