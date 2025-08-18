const fs = require("fs");
const path = require("path");
const ProjectsModel = require("../models/ProjectModel");

const getProjects = async (req, res) => {
  try {
    const projects = await ProjectsModel.getProjects();
    res.status(200).json({ status: 200, message: "Projects fetched successfully", data: projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ status: 500, message: "Failed to fetch projects", data: null });
  }
};

const addProject = async (req, res) => {
  try {
    const { title, description, tech_stack, link, github, order_no, from_date, to_date, is_current } = req.body;

    let image = null;
    if (req.file) {
      image = `assets/projects/${req.file.filename}`;
    }

    const projectData = {
      title,
      description,
      tech_stack,
      link,
      github,
      image, 
      order_no: order_no ? parseInt(order_no) : 0,
      from_date: from_date && from_date !== "" ? from_date : null,
      to_date: to_date && to_date !== "" ? to_date : null,
      is_current: is_current === "1" || is_current === 1 ? 1 : 0,
    };

    const newProject = await ProjectsModel.addProject(projectData);

    res.status(201).json({ status: 201, message: "Project added successfully", data: newProject });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ status: 500, message: "Failed to add project", data: null });
  }
};

const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tech_stack, link, github, order_no, from_date, to_date, is_current } = req.body;

    const project = await ProjectsModel.getProjectById(id);
    if (!project) return res.status(404).json({ status: 404, message: "Project not found", data: null });

    let image = project.image || null; // keep old image if no new file
    if (req.file) {
      // delete old image
      if (image) {
        const oldPath = path.join(__dirname, "..", "public", image);
        fs.unlink(oldPath, (err) => { if (err) console.error("Failed to delete old image:", oldPath, err); });
      }
      image = `assets/projects/${req.file.filename}`;
    }

    const updatedProject = await ProjectsModel.updateProject(id, {
      title,
      description,
      tech_stack,
      link,
      github,
      image,
      order_no,
      from_date: from_date && from_date !== "" ? from_date : null,
      to_date: to_date && to_date !== "" ? to_date : null,
      is_current: is_current ? 1 : 0,
    });

    res.status(200).json({ status: 200, message: "Project updated successfully", data: updatedProject });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ status: 500, message: "Failed to update project", data: null });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectsModel.getProjectById(id);

    if (!project) return res.status(404).json({ status: 404, message: "Project not found", data: null });

    if (project.image) {
      const imgPath = path.join(__dirname, "..", "public", project.image);
      fs.unlink(imgPath, (err) => { if (err) console.error("Failed to delete image:", imgPath, err); });
    }

    await ProjectsModel.deleteProject(id);
    res.status(200).json({ status: 200, message: "Project deleted successfully", data: null });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ status: 500, message: "Failed to delete project", data: null });
  }
};

module.exports = { getProjects, addProject, editProject, deleteProject };
