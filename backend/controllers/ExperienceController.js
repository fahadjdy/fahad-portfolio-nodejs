const path = require('path');
const fs = require('fs');

const ExperienceModel = require('../models/ExperienceModel');

const getExperience = async (req, res) => {
  try {
    const experience = await ExperienceModel.getExperience();
    res.status(200).json({
      status: 200,
      message: 'Experience data fetched successfully',
      data: experience
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'Failed to load experience.',
      data: null
    });
  }
};


module.exports = { getExperience};
