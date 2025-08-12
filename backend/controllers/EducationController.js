const path = require('path');
const fs = require('fs');

const EducationModel = require('../models/EducationModel');

const getEducations = async (req, res) => {
  try {
    const educations = await EducationModel.getEducations();
    res.status(200).json({
      status: 200,
      message: 'Educations data fetched successfully',
      data: educations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'Failed to load educations.',
      data: null
    });
  }
};


module.exports = { getEducations};
