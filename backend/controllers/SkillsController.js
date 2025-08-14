// controllers/SkillsController.js
const SkillsModel = require('../models/SkillsModel');

const getSkills = async (req, res) => {
  try {
    const skills = await SkillsModel.getSkills();
    res.status(200).json({
      status: 200,
      message: 'Skills fetched successfully',
      data: skills
    });
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({
      status: 500,
      message: 'Failed to load skills.',
      data: null
    });
  }
};

const addSkill = async (req, res) => {
  const { name, level, order_no } = req.body; // Example fields
  try {
    const newSkill = await SkillsModel.addSkill({ name, level, order_no });
    res.status(201).json({
      status: 201,
      message: 'Skill added successfully',
      data: newSkill
    });
  } catch (err) {
    console.error('Error adding skill:', err);
    res.status(500).json({
      status: 500,
      message: 'Failed to add skill',
      data: null
    });
  }
};

const editSkill = async (req, res) => {
  const { id } = req.params;
  const { name, level, order_no } = req.body;
  try {
    const updatedSkill = await SkillsModel.updateSkill(id, { name, level, order_no });
    res.status(200).json({
      status: 200,
      message: 'Skill updated successfully',
      data: updatedSkill
    });
  } catch (err) {
    console.error('Error updating skill:', err);
    res.status(500).json({
      status: 500,
      message: 'Failed to update skill',
      data: null
    });
  }
};

const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await SkillsModel.getSkillById(id);
    if (!skill) {
      return res.status(404).json({
        status: 404,
        message: 'Skill not found',
        data: null
      });
    }

    await SkillsModel.deleteSkill(id);
    res.status(200).json({
      status: 200,
      message: 'Skill deleted successfully',
      data: null
    });
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).json({
      status: 500,
      message: 'Failed to delete skill',
      data: null
    });
  }
};

module.exports = { getSkills, addSkill, editSkill, deleteSkill };
