// routes/education.routes.js
const router = require("express").Router();
const EducationController = require("../controllers/EducationController");

// Get all education records
router.get("/", EducationController.getEducation);

router.post("/add", EducationController.addEducation);

// Update an education record
router.put("/edit/:id", EducationController.editEducation);

// Delete an education record
router.delete("/delete/:id", EducationController.deleteEducation);

module.exports = router;
