// routes/hobbies.routes.js
const router = require("express").Router();
const HobbiesController = require("../controllers/HobbiesController");
const { authenticate } = require("../middlewares/auth");

router.use(authenticate);

router.get("/", HobbiesController.getHobbies);
router.post("/add", HobbiesController.addHobby);
router.put("/edit/:id", HobbiesController.editHobby);
router.delete("/delete/:id", HobbiesController.deleteHobby);

module.exports = router;
