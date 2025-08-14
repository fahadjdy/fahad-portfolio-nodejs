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

const editExperience = async (req, res) => {
  const { id } = req.params;
  const { title, description, company, startDate, endDate } = req.body;

  try {
    const updatedExperience = await ExperienceModel.updateExperience(id, { title, description, company, startDate, endDate });
    res.status(200).json({ status: 200, message: 'Experience updated successfully', data: updatedExperience });
  } catch (err) {
    console.error('Error updating experience:', err);
    res.status(500).json({ status: 500, message: 'Failed to update experience', data: null });
  }
};

const deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    const experience = await ExperienceModel.getExperienceById(id);
    if (!experience) {
      return res.status(404).json({ status: 404, message: 'Experience not found', data: null });
    }

    await ExperienceModel.deleteExperience(id);
    res.status(200).json({ status: 200, message: 'Experience deleted successfully', data: null });
  } catch (err) {
    console.error('Error deleting experience:', err);
    res.status(500).json({ status: 500, message: 'Failed to delete experience', data: null });
  }
};

module.exports = { getExperience,editExperience,deleteExperience};
