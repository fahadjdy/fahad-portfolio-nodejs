// routes/hobbies.routes.js
const router = require("express").Router();
const HobbiesController = require("../controllers/HobbiesController");
const { authenticate } = require("../middlewares/auth");

// Get all hobbies
router.get("/", HobbiesController.getHobbies);


// ================ Authenticated user only ==================================
router.use(authenticate);

router.post("/add", HobbiesController.addHobby);
router.put("/edit/:id", HobbiesController.editHobby);
router.delete("/delete/:id", HobbiesController.deleteHobby);

module.exports = router;
