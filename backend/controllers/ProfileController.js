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

    // Get body fields safely
    const profileData = { ...req.body };

    // Check if profile exists
    const existingProfile = await ProfileModel.getProfileById(id);
    if (!existingProfile) {
      return res.status(404).json({ status: 404, message: "Profile not found" });
    }

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (existingProfile.image) {
        const oldPath = path.join(__dirname, "../public", existingProfile.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      profileData.image = `assets/profile/${req.file.filename}`;
    }

    // Update DB
    const updatedProfile = await ProfileModel.updateProfile(id, profileData);

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: updatedProfile
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ status: 500, message: "Failed to update profile" });
  }
};

module.exports = { getProfile,editProfile};