// routes/profile.routes.js
const router = require("express").Router();
const express = require("express");
const ProfileController = require("../controllers/ProfileController");
const uploadProfile = require("../config/multerProfile");
const { authenticate } = require("../middlewares/auth");


// Custom middleware to handle multer errors
const uploadMiddleware = (req, res, next) => {
  uploadProfile.fields([
    { name: "image", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
    { name: "logo", maxCount: 1 }
  ])(req, res, function (err) {
    if (err instanceof Error) {
      return res.status(400).json({ status: 400, message: err.message });
    }
    next();
  });
};
router.use(authenticate);

router.get("/", ProfileController.getProfile);
router.put( "/edit/:id",uploadMiddleware,ProfileController.editProfile);


module.exports = router;
