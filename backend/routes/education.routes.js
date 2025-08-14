// routes/education.routes.js
const router = require("express").Router();
const EducationController = require("../controllers/EducationController");
const { authenticate } = require("../middlewares/auth");


router.get("/", EducationController.getEducation);

// ================ Authenticated user only ==================================
router.use(authenticate);

router.post("/add", EducationController.addEducation);
router.put("/edit/:id", EducationController.editEducation);
router.delete("/delete/:id", EducationController.deleteEducation);

module.exports = router;
