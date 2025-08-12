// models/SkillsModel.js
const db = require('./index');

const SkillsModel = {
    async getSkills() {
        const [rows] = await db.query('SELECT * FROM skill');
        return rows;
    }
};
module.exports = SkillsModel;
