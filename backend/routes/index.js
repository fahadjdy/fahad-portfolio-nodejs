const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/profile", require("./profile.routes"));
router.use("/educations", require("./education.routes"));
router.use("/experience", require("./experience.routes"));
router.use("/skills", require("./skills.routes"));
router.use("/hobbies", require("./hobbies.routes"));
router.use("/projects", require("./projects.routes"));
router.use("/test",
    (req, res) => {
        res.send("Test Route");
    }
);

module.exports = router;
