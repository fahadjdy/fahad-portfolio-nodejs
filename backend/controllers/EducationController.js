// controllers/EducationController.js
const EducationModel = require('../models/EducationModel');

const getEducation = async (req, res) => {
  try {
    const education = await EducationModel.getEducation();
    res.status(200).json({
      status: 200,
      message: 'Education data fetched successfully',
      data: education
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: 'Failed to load education.',
      data: null
    });
  }
};

const addEducation = async (req, res) => {
  const { school, degree, location, from_date, to_date, is_current, grade, description, order_no } = req.body;

  try {
    const newEducation = await EducationModel.addEducation({
      school,
      degree,
      location,
      from_date,
      to_date,
      is_current,
      grade,
      description,
      order_no
    });
    res.status(201).json({ status: 201, message: 'Education added successfully', data: newEducation });
  } catch (err) {
    console.error('Error adding education:', err);
    res.status(500).json({ status: 500, message: 'Failed to add education', data: null });
  }
};


const editEducation = async (req, res) => {
  const { id } = req.params;
  const { school, degree, location, from_date, to_date, is_current, grade, description, order_no } = req.body;

  try {
    const updatedEducation = await EducationModel.updateEducation(id, { 
      school, 
      degree, 
      location, 
      from_date, 
      to_date, 
      is_current, 
      grade, 
      description, 
      order_no 
    });
    res.status(200).json({ status: 200, message: 'Education updated successfully', data: updatedEducation });
  } catch (err) {
    console.error('Error updating education:', err);
    res.status(500).json({ status: 500, message: 'Failed to update education', data: null });
  }
};

const deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const education = await EducationModel.getEducationById(id);
    if (!education) {
      return res.status(404).json({ status: 404, message: 'Education not found', data: null });
    }

    await EducationModel.deleteEducation(id);
    res.status(200).json({ status: 200, message: 'Education deleted successfully', data: null });
  } catch (err) {
    console.error('Error deleting education:', err);
    res.status(500).json({ status: 500, message: 'Failed to delete education', data: null });
  }
};

module.exports = { getEducation, addEducation, editEducation, deleteEducation };
