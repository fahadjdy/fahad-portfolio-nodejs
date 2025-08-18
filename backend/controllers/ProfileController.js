const path = require('path');
const fs = require('fs');
const ProfileModel = require('../models/ProfileModel');

const getProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.getProfile();        
    res.status(200).json({
      status: 200,
      message: 'Profile data fetched successfully',
      data: profile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'Failed to load profile.',
      data: null
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileData = { ...req.body };

    // Check if profile exists
    const existingProfile = await ProfileModel.getProfileById(id);
    if (!existingProfile) {
      return res.status(404).json({ status: 404, message: "Profile not found" });
    }

    // --- Handle image update ---
    if (req.files && req.files.image && req.files.image.length > 0) {
      const imageFile = req.files.image[0];

      // Delete old image if exists
      if (existingProfile.image) {
        const oldPath = path.join(__dirname, "../public", existingProfile.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      // Save relative path
      profileData.image = `assets/profile/${imageFile.filename}`;
    }

    // --- Handle favicon update ---
    if (req.files && req.files.favicon && req.files.favicon.length > 0) {
      const faviconFile = req.files.favicon[0];

      if (existingProfile.favicon) {
        const oldFaviconPath = path.join(__dirname, "../public", existingProfile.favicon);
        if (fs.existsSync(oldFaviconPath)) fs.unlinkSync(oldFaviconPath);
      }

      profileData.favicon = `assets/profile/${faviconFile.filename}`;
    }

    // --- Handle favicon update ---
    if (req.files && req.files.logo && req.files.logo.length > 0) {
      const logoFile = req.files.logo[0];

      if (existingProfile.logo) {
        const oldLogoPath = path.join(__dirname, "../public", existingProfile.logo);
        if (fs.existsSync(oldLogoPath)) fs.unlinkSync(oldLogoPath);
      }

      profileData.logo = `assets/profile/${logoFile.filename}`;
    }

    // Update DB
    const updatedProfile = await ProfileModel.updateProfile(id, profileData);

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: updatedProfile
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

module.exports = { getProfile, editProfile };
