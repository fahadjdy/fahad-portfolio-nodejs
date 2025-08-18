// models/ProjectsModel.js
const db = require('./index');

const allowedFields = [
  'title',
  'description',
  'tech_stack',
  'link',
  'github',
  'image',
  'order_no',
  'from_date',
  'to_date',
  'is_current'
];

const ProjectsModel = {
  async getProjects() {
    const [rows] = await db.query(
      'SELECT * FROM projects ORDER BY order_no ASC, created_at DESC'
    );
    return rows;
  },

  async getProjectById(id) {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
  },

  async addProject(projectData) {
    const [result] = await db.query('INSERT INTO projects SET ?', [projectData]);
    return this.getProjectById(result.insertId);
  },

  async updateProject(id, projectData) {
    const filteredData = {};
    for (const field of allowedFields) {
      if (projectData[field] !== undefined) {
        filteredData[field] = projectData[field];
      }
    }

    if (Object.keys(filteredData).length === 0) {
      throw new Error('No valid fields provided for update');
    }

    const [result] = await db.query('UPDATE projects SET ? WHERE id = ?', [filteredData, id]);
    if (result.affectedRows === 0) {
      throw new Error('Project not found');
    }

    return this.getProjectById(id);
  },

  async deleteProject(id) {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error('Project not found');
    }
    return result;
  }
};

module.exports = ProjectsModel;
