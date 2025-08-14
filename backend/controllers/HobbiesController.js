// controllers/HobbiesController.js
const HobbiesModel = require('../models/HobbiesModel');

const getHobbies = async (req, res) => {
  try {
    const hobbies = await HobbiesModel.getHobbies();
    res.status(200).json({
      status: 200,
      message: 'Hobbies fetched successfully',
      data: hobbies
    });
  } catch (err) {
    console.error('Error fetching hobbies:', err);
    res.status(500).json({
      status: 500,
      message: 'Failed to load hobbies.',
      data: null
    });
  }
};

const addHobby = async (req, res) => {
  const { name, description, order_no } = req.body;
  try {
    const newHobby = await HobbiesModel.addHobby({ name, description, order_no });
    res.status(201).json({
      status: 201,
      message: 'Hobby added successfully',
      data: newHobby
    });
  } catch (err) {
    console.error('Error adding hobby:', err);
    res.status(500).json({
      status: 500,
      message: 'Failed to add hobby',
      data: null
    });
  }
};

const editHobby = async (req, res) => {
  const { id } = req.params;
  const { name, description, order_no } = req.body;
  try {
    const updatedHobby = await HobbiesModel.updateHobby(id, { name, description, order_no });
    res.status(200).json({
      status: 200,
      message: 'Hobby updated successfully',
      data: updatedHobby
    });
  } catch (err) {
    console.error('Error updating hobby:', err);
    res.status(500).json({
      status: 500,
      message: 'Failed to update hobby',
      data: null
    });
  }
};

const deleteHobby = async (req, res) => {
  const { id } = req.params;
  try {
    const hobby = await HobbiesModel.getHobbyById(id);
    if (!hobby) {
      return res.status(404).json({
        status: 404,
        message: 'Hobby not found',
        data: null
      });
    }

    await HobbiesModel.deleteHobby(id);
    res.status(200).json({
      status: 200,
      message: 'Hobby deleted successfully',
      data: null
    });
  } catch (err) {
    console.error('Error deleting hobby:', err);
    res.status(500).json({
      status: 500,
      message: 'Failed to delete hobby',
      data: null
    });
  }
};

module.exports = { getHobbies, addHobby, editHobby, deleteHobby };
