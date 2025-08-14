// routes/hobbies.routes.js
const router = require("express").Router();
const HobbiesController = require("../controllers/HobbiesController");

// Get all hobbies
router.get("/", HobbiesController.getHobbies);

// Add a new hobby
router.post("/add", HobbiesController.addHobby);

// Edit an existing hobby
router.put("/edit/:id", HobbiesController.editHobby);

// Delete a hobby
router.delete("/delete/:id", HobbiesController.deleteHobby);

module.exports = router;
