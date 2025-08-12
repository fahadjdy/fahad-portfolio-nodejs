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
    const { name, email, contact, address } = req.body;

    const existingProfile = await ProfileModel.getProfileById(id);
    if (!existingProfile) {
      return res.status(404).json({ status: 404, message: 'Profile not found', data: null });
    }

    let image = existingProfile.image;
    if (req.file) {
      if (image && fs.existsSync(path.join(__dirname, '../public', image))) {
        fs.unlinkSync(path.join(__dirname, '../public', image));
      }
      image = `assets/profile/${req.file.filename}`;
    }

    const updatedProfile = await ProfileModel.updateProfile(id, { name, email, contact, address, image });
    res.status(200).json({ status: 200, message: 'Profile updated successfully', data: updatedProfile });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ status: 500, message: 'Failed to update profile', data: null });
  }
};

module.exports = { getProfile,editProfile};