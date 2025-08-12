const path = require('path');
const fs = require('fs');

const SkillsModel = require('../models/SkillsModel');

const getSkills = async (req, res) => {
  try {
    const skills = await SkillsModel.getSkills();
    res.status(200).json({
      status: 200,
      message: 'Skills data fetched successfully',
      data: skills
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'Failed to load skills.',
      data: null
    });
  }
};


module.exports = { getSkills};
