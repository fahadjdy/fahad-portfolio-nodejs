const router = require("express").Router();
const ProjectController = require("../controllers/ProjectController");
const { authenticate } = require("../middlewares/auth");
const uploadProject = require("../config/multerProject");

// Routes
router.get("/", authenticate, ProjectController.getProjects);
router.post("/add", authenticate, uploadProject.single("image"), ProjectController.addProject);
router.put("/edit/:id", authenticate, uploadProject.single("image"), ProjectController.editProject);
router.delete("/delete/:id", authenticate, ProjectController.deleteProject);

module.exports = router;
